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
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface RhineResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface RhinePromise<T = any> extends Promise<RhineResponse<T>> {}

export interface RhineError extends Error {
  config?: RequestConfig
  code: string | null
  request?: any
  response?: RhineResponse
}

export interface Rhine {
  request<T = any>(config: RequestConfig): RhinePromise<T>

  get<T = any>(url: string, config?: RequestConfig): RhinePromise<T>

  delete<T = any>(url: string, config?: RequestConfig): RhinePromise<T>

  head<T = any>(url: string, config?: RequestConfig): RhinePromise<T>

  options<T = any>(url: string, config?: RequestConfig): RhinePromise<T>

  post<T = any>(url: string, data: any, config?: RequestConfig): RhinePromise<T>

  put<T = any>(url: string, data: any, config?: RequestConfig): RhinePromise<T>

  patch<T = any>(url: string, data: any, config?: RequestConfig): RhinePromise<T>
}

export interface RhineInstance extends Rhine {
  <T = any>(config: RequestConfig): RhinePromise<T>

  <T = any>(url: string, config?: RequestConfig): RhinePromise<T>
}
