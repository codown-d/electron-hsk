import axios from 'axios'
import baseUrl from './baseUrl'
import { WebResponse } from '@renderer/definitions'
import { getCurrentLanguage } from '@renderer/utils'
import { onResult } from '@renderer/components/Message'

interface BaseParams {
  url: string
  data: any
  contentType?: string
}

interface HttpOption {
  url: string
  data: any
  method: string
  headers: any
}

// 错误处理/拦截器
const responseErrorHandle = (error: any) => {
  onResult(error.response.data)
  if (error.response) {
    const { status } = error.response
    if (status === 401) {
    }
  }
}

// 构建基础的请求参数
const baseOptions = async (params: BaseParams, method = 'post') => {
  //   const userData = await gloabReadDbData('user')
  let userData = { token: null }
  const Authorization = userData ? `Bearer ${userData.token}` : ''
  let { url, data } = params
  let contentType = params.contentType || 'application/json'
  const option: HttpOption = {
    url: `${baseUrl}${url}`,
    data: data,
    method: method,
    headers: {
      'Content-Type': contentType,
      Accept: 'application/json',
      'Accept-Language': getCurrentLanguage(),
      Authorization
    }
  }
  return option
}

// electron net 请求
const netRequest = (option: HttpOption) => {
  return new Promise(async (resolve, reject) => {
    const { net } = require('electron')
    const request = net.request(option)
    let Data = {}
    request.on('response', (response) => {
      response.on('data', (chunk) => {
        Data = chunk
      })
      response.on('end', () => {
        if (response.statusCode !== 200) {
          reject({
            status: response.statusCode,
            data: Data
          })
        }
        resolve({
          data: Data,
          status: response.statusCode
        })
      })
    })
    request.end()
  })
}

// axios请求
const axiosRequest = (option: HttpOption) => {
  let newOption = { ...option }
  if ('get' == newOption.method) {
    newOption['params'] = newOption['data']
  }
  return axios(newOption).then((res) => {
    if (200 == res.status) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  })
}

// 核心基础请求封装
export const baseRequest = (
  url: string,
  data: any,
  method = 'get',
  silent = false
): Promise<WebResponse<any>> => {
  return new Promise(async (resolve, reject) => {
    const option = await baseOptions({ url, data }, method)
    const isDev = import.meta.env.MODE === 'development'
    let fn = isDev ? axiosRequest : netRequest
    fn(option)
      .then((res: any) => {
        resolve(WebResponse.from<any>(res))
        if (silent) {
        }
      })
      .catch((err) => {
        if (!silent) {
          responseErrorHandle(err)
        }
        reject(err)
      })
  })
}
export const getRequest = (url: string, data = {}) => {
  return baseRequest(url, data, 'get')
}
export const postRequest = (url: string, data = {}) => {
  return baseRequest(url, data, 'post')
}
