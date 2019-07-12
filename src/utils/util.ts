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
