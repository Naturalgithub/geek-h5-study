import { Toast } from 'antd-mobile';
// 封装axios
import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在请求之前做些什么
    return config
  },
  function (error) {
    // 请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (respose) {
    return respose
  },
  function (error) {
    if (!error.response) {
      // 由于网络繁忙导致的
      Toast.show('网络繁忙，稍后再试！')
    } else {
      // 不是网络繁忙
      Toast.show(error.response.data.message)
    }
    return Promise.reject(error)
  }
)
export default instance