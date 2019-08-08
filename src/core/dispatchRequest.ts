import { RequestConfig, RhinePromise, RhineResponse } from '../types'

import xhr from './xhr'
import { buildURL } from '../utils/url'
import { flattenHeaders } from '../utils/headers'
import transform from './transform'

function rhine(config: RequestConfig): RhinePromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: RequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: RequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformResponseData(res: RhineResponse): RhineResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: RequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
export default rhine
