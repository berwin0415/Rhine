export type Method =
  | `get`
  | 'GET'
  | `delete`
  | 'DELETE'
  | `put`
  | 'PUT'
  | `post`
  | 'POST'
  | `options`
  | 'OPTIONS'
  | `patch`
  | 'PATCH'
  | 'head'
  | 'HEAD'

export interface RequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface RhineResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface RhinePromise extends Promise<RhineResponse> {}
