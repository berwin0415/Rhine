import dispatchRequest from './dispatchRequest'
import {
  RequestConfig,
  RhinePromise,
  Method,
  RhineResponse,
  ResolvedFn,
  RejectedFn
} from '../types'
import { isString } from '../utils/util'

import InterceporManager from './InterceporManager'
import mergeConfig from './ mergeConfig'

interface Interceptors {
  request: InterceporManager<RequestConfig>
  response: InterceporManager<RhineResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: RequestConfig) => RhinePromise)
  rejected?: RejectedFn
}
export default class Rhine {
  defaults: RequestConfig
  interceptors: Interceptors

  constructor(initConfig: RequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceporManager<RequestConfig>(),
      response: new InterceporManager<RhineResponse>()
    }
  }
  request(url: any, config?: any): RhinePromise {
    if (isString(url)) {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
