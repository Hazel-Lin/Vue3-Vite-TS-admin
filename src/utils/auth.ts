import Cookies from 'js-cookie'

const TokenKey = 'token'

const getToken = function () {
  return Cookies.get(TokenKey)
}
const setToken = function (token: any) {
  return Cookies.set(TokenKey, token)
}
const removeToken = function () {
  return Cookies.remove(TokenKey)
}

export { getToken, setToken, removeToken }
