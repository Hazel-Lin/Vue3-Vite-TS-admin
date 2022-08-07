export default class ResponseHelper {
  private response: any

  constructor(response: any) {
    this.response = response
  }

  isSuccess() {
    return (this.response.code) === 0
  }

  getMessage() {
    return this.response.message || '请求出错'
  }

  setMessage(message: string) {
    this.response.message = message
  }

  getData() {
    return this.response.data
  }

  setData(data: any) {
    this.response.data = data
  }

  getResponse() {
    return this.response
  }
}
