import { isPlainObject } from './util'

function normalizedHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizedHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed: any = {}
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(item => {
    const [key, value] = item.split(':')
    if (!key) {
      return
    }
    if (value) {
      parsed[key] = value.trim()
    }
  })
  return parsed
}
