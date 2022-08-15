import { Token } from "@/types/data"

/**
 * @description: 本地存储封装
 */
const TOKEN_KEY = 'geek-h5-study-token'

/**
 * @description: 保存token
 * @param {string} token
 * @return {*}
 */
export function setToken(token: Token): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}


/**
 * @description: 获取token
 * @return {*}
 */
export function getToken(): Token {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}")
}

/**
 * @description: 移除token
 * @return {*}
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * @description:判断是否有token
 * @return {*}
 */
export function hasToken() {
  return !!getToken().token
}
