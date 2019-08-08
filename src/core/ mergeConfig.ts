import { RequestConfig } from '../types'
import { isPlainObject, isUndefined, deepMerge } from '../utils/util'

const strats = Object.create(null)

const defaultStrat = (value1: any, value2: any): any =>
  typeof value2 === 'undefined' ? value1 : value2

const fromVal2Strat = (value1: any, value2: any): any => {
  if (typeof value2 !== 'undefined') {
    return value2
  }
}

const deepMergeStrat = (value1: any, value2: any): any => {
  if (isPlainObject(value2)) {
    return deepMerge(value1, value2)
  } else if (!isUndefined(value2)) {
    return value2
  } else if (isPlainObject(value1)) {
    return deepMerge(value1, value2)
  } else if (!isUndefined(value1)) {
    return value1
  }
}

const stratKeysDeepMerge = ['headers']
const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysDeepMerge.forEach(key => (strats[key] = deepMergeStrat))
stratKeysFromVal2.forEach(key => (strats[key] = fromVal2Strat))

export default function mergeConfig(
  config1: RequestConfig,
  config2?: RequestConfig
): RequestConfig {
  if (!config2) {
    config2 = {}
  }

  let config = Object.create(null)

  const mergeField = (key: string): void => {
    const strat = strats[key] || defaultStrat

    config[key] = strat(config1[key], config2![key])
  }

  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  return config
}
