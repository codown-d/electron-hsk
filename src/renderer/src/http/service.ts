import { api } from './api'
import { getRequest, postRequest } from './index'

export const getCreateCaptcha = (data: any) => {
  return getRequest(`${api.createCaptcha}`, {})
}
export const postCreateCaptcha = (data?: any) => {
  return postRequest(`${api.createCaptcha}`, {})
}
export const getSecret = (data: any) => {
  console.log(data)
  return getRequest(`${api.secret}`, data)
}
export const postLogin = (data?: any) => {
  return postRequest(`${api.login}`, data)
}
export const unauthorizedFetch = () => {
  return postRequest('/api/unauthorized', {})
}
