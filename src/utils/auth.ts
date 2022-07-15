const TokenKey = 'token'

const getToken = function () {
  return localStorage.getItem(TokenKey)
}
const setToken = function (token: any) {
  return localStorage.setItem(TokenKey, token)
}
const removeToken = function () {
  return localStorage.remremoveItemove(TokenKey)
}

export { getToken, setToken, removeToken }
