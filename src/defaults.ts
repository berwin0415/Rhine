import { RequestConfig } from './types'
import { processHeaders } from './utils/headers'
import { transformRequest, transformResponse } from './utils/data'

const defaults: RequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    (data: any, headers: any): any => {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [(data: any): any => transformResponse(data)]
}

const methodNoData = ['delete', 'get', 'head', 'options']

methodNoData.forEach(method => (defaults.headers[method] = {}))

const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(
  method =>
    (defaults.headers[method] = {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
)

export default defaults
