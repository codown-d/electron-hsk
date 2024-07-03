import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import '@renderer/common/styles/global.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { globalRouters } from './router'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={globalRouters} fallbackElement={<>加载中。。。</>} />
    </ConfigProvider>
  </React.StrictMode>
)
