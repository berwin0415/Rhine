import { RequestConfig, RhineStatic } from './types'
import Rhine from './core/Rhine'
import { extend } from './utils/util'
import defaults from './defaults'
import mergeConfig from './core/ mergeConfig'
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/cancel'

function createInstance(config: RequestConfig): RhineStatic {
  const context = new Rhine(config)
  const instance = Rhine.prototype.request.bind(context)
  extend(instance, context)
  return instance as RhineStatic
}

const rhine = createInstance(defaults)

rhine.create = config => {
  return createInstance(mergeConfig(defaults, config))
}

rhine.CancelToken = CancelToken
rhine.Cancel = Cancel
rhine.isCancel = isCancel

export default rhine
