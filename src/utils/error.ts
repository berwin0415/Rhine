import { RhineResponse, RequestConfig } from '../types'

class RhineError extends Error {
  isRhineError: boolean
  config: RequestConfig
  code?: string | null
  request?: any
  response?: RhineResponse

  constructor(
    message: string,
    config: RequestConfig,
    code?: string | null,
    request?: any,
    response?: RhineResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isRhineError = true

    Object.setPrototypeOf(this, RhineError.prototype)
  }
}

export function createError(
  message: string,
  config: RequestConfig,
  code?: string | null,
  request?: any,
  response?: RhineResponse
) {
  return new RhineError(message, config, code, request, response)
}
