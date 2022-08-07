const TokenKey = 'token'

const getToken = function () {
  return localStorage.getItem(TokenKey)
}
const setToken = function (token: any) {
  return localStorage.setItem(TokenKey, token)
}
const removeToken = function () {
  return localStorage.removeItem(TokenKey)
}

export { getToken, setToken, removeToken }
