import { Token } from "@/types/data";
import { Channel } from './../types/data.d';

/**
 * @description: 本地存储封装
 */
const TOKEN_KEY = 'geek-h5-study-token'
const CHANNEL_KEY= 'geek-h5-study-channel'

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

/**
 * @description: 保存频道数据
 * @param {Channel} channels
 * @return {*}
 */
export function setChannels(channels: Channel[]) {
  localStorage.setItem(CHANNEL_KEY,JSON.stringify(channels))
}

/**
 * @description: 获取频道数据
 * @return {*}
 */
export function getChannels() {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY)|| '[]')
}