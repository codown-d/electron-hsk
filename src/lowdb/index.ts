import { JSONFilePreset } from 'lowdb/node'
let dbInstance: any = null

export interface WriteDbDataParams {
  key: string
  value: any
}
type Data = {
  lowdb: string
  userInfo?: any
}
// 初始化数据库
export const initDb = () => {
  const { app } = require('electron')
  const { join } = require('path')
  return new Promise(async (resolve) => {
    const file = join(app.getAppPath(), 'db.json')
    console.log(file)
    const defaultData: Data = {
      lowdb: 'hello world'
    }
    const dbInstance = await JSONFilePreset(file, defaultData)
    await dbInstance.read()
    console.log(dbInstance.data.lowdb)
    if (dbInstance.data && dbInstance.data.lowdb) {
      resolve(true)
    } else {
      dbInstance.data.lowdb = 'YYDS'
      await dbInstance.write()
      resolve(true)
    }
  })
}

// 写数据
export const writeDbData = async (data: WriteDbDataParams) => {
  if (dbInstance) {
    try {
      await dbInstance.read()
      dbInstance.data[data.key] = data.value
      await dbInstance.write()
    } catch (err) {
      console.error(err)
    }
  }
}

// 读数据
export const readDbData = (key: string) => {
  return new Promise(async (resolve) => {
    if (dbInstance) {
      try {
        await dbInstance.read()
        const res = dbInstance.data[key]
        resolve(res || '')
      } catch {
        resolve('')
      }
    } else {
      resolve('')
    }
  })
}
