export interface ResponseData<T = unknown> {
  code?: number
  message?: string
  data: T
}

export function setResponse<T>(data: T, code = undefined, message = undefined): ResponseData<T> {
  return {
    data,
    code,
    message,
  }
}
