import { RequestConfig, RhinePromise, RhineResponse } from '../types'

import { parseHeaders } from '../utils/headers'

import { createError } from '../utils/error'

export default function xhr(config: RequestConfig): RhinePromise {
  return new Promise((resole, reject) => {
    try {
      const {
        method = 'get',
        url,
        data = null,
        headers,
        responseType,
        timeout,
        cancelToken
      } = config

      let request = new XMLHttpRequest()

      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
      request.open(method.toUpperCase(), url!, true)

      request.onreadystatechange = () => {
        if (request.status === 0) {
          return
        }
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
          handleResponse(response, request)
        }
      }

      request.onerror = () => reject(createError('Network Error', config, null, request))

      request.ontimeout = () =>
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))

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

    function handleResponse(res: RhineResponse, req?: any): void {
      if (res.status >= 200 && res.status < 300) {
        resole(res)
      } else {
        reject(createError(`Request failed with status code ${res.status}`, config, null, req, res))
      }
    }
  })
}
