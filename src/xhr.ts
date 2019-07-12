import { RequestConfig, RhinePromise, RhineResponse } from './types'

import { parseHeaders } from './utils/headers'

export default function xhr(config: RequestConfig): RhinePromise {
  return new Promise((resole, reject) => {
    try {
      const { method = 'get', url, data = null, headers, responseType } = config

      let request = new XMLHttpRequest()

      if (responseType) {
        request.responseType = responseType
      }

      request.open(method.toUpperCase(), url, true)

      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          const responseHearder = parseHeaders(request.getAllResponseHeaders())
          const responseData = responseType === 'text' ? request.responseText : request.response
          const response: RhineResponse = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHearder,
            config,
            request
          }
          resole(response)
        }
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })

      request.send(data)
    } catch (error) {
      reject(error)
    }
  })
}
