/// <reference types="vite/client" />
//控制render里面的ts格式
interface ImportMetaEnv {
  readonly VITE_CURRENT_RUN_MODE: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
