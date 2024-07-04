// IPC test
import { BrowserWindow, ipcMain } from 'electron'
import { readDir } from '../readDir'
import { getElectronVersion } from '../version'

export const initIpc = (_mainWindow: BrowserWindow) => {
  ipcMain.on('ping', () => console.log('pong'))
  //ipcMain.on(channel, listener) 主进程监听来自渲染进程的通信 && ipcRenderer.send(channel, ...args),渲染进程向主进程发送异步消息
  ipcMain.on('readDir', readDir)
  //ipcMain.handle(channel, listener) 主进程的监听函数 && ipcRenderer.invoke(channel, ...args) 渲染进程的发送消息的函数
  ipcMain.handle('getElectronVersion', getElectronVersion)
}
