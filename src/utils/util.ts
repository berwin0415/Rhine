export const toString = Object.prototype.toString

export const isDate = (value: any): value is Date => toString.call(value) === '[object Date]'

// export const isObject = (value: any): value is Object => value !== null && typeof value === "object"

export const encode = (values: string): string =>
  encodeURIComponent(values)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')

export const isPlainObject = (value: any): value is Object =>
  toString.call(value) === '[object Object]'

export const isString = (value: any): Boolean => typeof value === 'string'

export const isUndefined = (value: any): Boolean => typeof value === 'undefined'

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        result[key] = isPlainObject(value)
          ? isPlainObject(result[key])
            ? deepMerge(result[key], value)
            : deepMerge(value)
          : value
      })
    }
  })
  return result
}
