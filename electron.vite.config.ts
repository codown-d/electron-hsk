import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/ws/v1': {
          // target: 'ws://192.168.0.66:60601/',这是后端接口地址
          target: 'ws://console-local01.tensorsecurity.cn:30043/',
          changeOrigin: true,
          ws: true
        },
        '/api': {
          // https://console-test-cn.tensorsecurity.cn/
          // https://console-local02.tensorsecurity.cn/
          target: 'https://console.tensorsecurity.cn/',
          changeOrigin: true
        }
      }
    }
  }
})
