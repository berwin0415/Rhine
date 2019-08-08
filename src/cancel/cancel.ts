export default class Cancel {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): any {
  return value instanceof Cancel
}
