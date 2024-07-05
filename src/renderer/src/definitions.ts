export interface IResponseErrorItem {
  domain?: string
  reason?: string
  message?: string
  location?: string
  locationType?: string
  extendedHelp?: string
  sendReport?: string
}

export interface IResponseError {
  code?: string
  message?: string
  errors?: Array<IResponseErrorItem>
}

export interface IResponseData<T> {
  totalItems?: number
  items?: Array<T>
  item?: T
}
export class WebResponse<T> {
  apiVersion?: string
  data?: IResponseData<T>
  error?: IResponseError
  public get totalItems(): number {
    return this.data?.totalItems || this.data?.items?.length || 0
  }
  public reverseItems(): WebResponse<T> {
    if (!this.data || !this.data.items) {
      return this
    }
    this.data.items = this.data.items.reverse()
    return this
  }
  public getItem(): T | null {
    if (!this.data?.item) {
      return null
    }
    return this.data?.item
  }
  public getItems(): T[] {
    if (!this.data?.items) {
      return []
    }

    return this.data?.items
  }
  public static from<T>(raw: WebResponse<T>): WebResponse<T> {
    const res = new WebResponse<T>()
    res.data = raw.data
    res.error = raw.error
    return res
  }
}
export enum SupportedLangauges {
  Chinese = 'zh',
  English = 'en'
}
