import { RequestConfig, RhinePromise, RhineResponse } from './types'

import xhr from './xhr'
import { buildURL } from './utils/url'
import { transformRequest, transformResponse } from './utils/data'
import { processHeaders } from './utils/headers'

function rhine(config: RequestConfig): RhinePromise {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: RequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformRequestData(config: RequestConfig): any {
  return transformRequest(config.data)
}

function transformURL(config: RequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformHeaders(config: RequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: RhineResponse): RhineResponse {
  res.data = transformResponse(res.data)
  return res
}

export default rhine
