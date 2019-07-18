import dispatchRequest from './dispatchRequest'
import { RequestConfig, RhinePromise, Method } from '../types'
import { isString } from '../utils/util'

export default class Rhine {
  request(url: any, config?: any): RhinePromise {
    if (isString(url)) {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: RequestConfig): RhinePromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: RequestConfig): RhinePromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: RequestConfig): RhinePromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: RequestConfig): RhinePromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: RequestConfig): RhinePromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: RequestConfig): RhinePromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: RequestConfig): RhinePromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: RequestConfig): RhinePromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data: any,
    config?: RequestConfig
  ): RhinePromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
