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
  transformRequest?: RhineTransformer | RhineTransformer[]
  transformResponse?: RhineTransformer | RhineTransformer[]
  cancelToken?: CancelToken

  [propName: string]: any
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
  defaults: RequestConfig
  interceprors: {
    request: RhineInterceptorManager<RequestConfig>
    response: RhineInterceptorManager<RhineResponse>
  }
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

export interface RhineStatic extends RhineInstance {
  create(config?: RequestConfig): RhineInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
export interface RhineInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface RhineTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTonkenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTonkenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
