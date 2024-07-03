declare global {
  interface Window {
    api: any
  }
}
export interface RouteTypes {
  path: string
  element: any
  children?: RouteTypes[]
}
