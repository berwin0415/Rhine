import { request } from 'https'

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
  timeout?: number
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

export interface RhineError extends Error {
  config?: RequestConfig
  code: string | null
  request?: any
  response?: RhineResponse
}
