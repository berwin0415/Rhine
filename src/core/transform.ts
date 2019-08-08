import { RhineTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: RhineTransformer | RhineTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => (data = fn(data, headers)))
  return data
}
