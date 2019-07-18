import { RhineInstance } from './types'
import Rhine from './core/Rhine'
import { extend } from './utils/util'

function createInstance(): RhineInstance {
  const context = new Rhine()
  const instance = Rhine.prototype.request.bind(context)
  extend(instance, context)
  return instance as RhineInstance
}

const rhine = createInstance()

export default rhine
