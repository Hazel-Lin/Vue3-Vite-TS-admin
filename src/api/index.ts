import Request from "./request";

export default new Request({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})