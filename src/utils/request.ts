import store from '@/store';
import { getToken, setToken } from '@/utils/storage';
import { Toast } from 'antd-mobile';
import history from './history';
// 封装axios
import { logout } from '@/store/actions/login';
import axios, { AxiosError } from 'axios';


const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

const request2 = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})


// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在请求之前做些什么
    const token = getToken()
    if (token.token) {
      config.headers!.Authorization = `Bearer ${token.token}`
    }
    return config
  },
  function (error) {
    // 请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (respose) {
    return respose
  },
  async function (error: AxiosError<{ message: string }>)  {
    if (!error.response) {
      // 由于网络繁忙导致的
      Toast.show('网络繁忙，稍后再试！')
      return Promise.reject(error)
    } 

    // 1. 判断是否401错误
    if (error.response.status === 401) {
      
      // 2. 401错误 没有token token过期了
      const token = getToken()
        
      if (token.token && token.refresh_token) {
        try {
          // 3.有token token过期，尝试去刷新token，注意需要使用原始的axios来刷新
          const res = await request2({
            url: '/authorizations',
            method: 'put',
            headers: {
              Authorization: `Bearer ${token.refresh_token}`,
            },
          })
          
          // 4. 刷新token成功，将新的token保存在redux中
          store.dispatch({
            type: 'login/login',
            payload: {
              token: res.data.data.token,
              refresh_token:token.refresh_token
            }
          })

          // 5. 将token保存在宿主环境中
          setToken({
            token: res.data.data.token,
            refresh_token:token.refresh_token
          })
          
          // Token已经没问题了,重新发送请求
          return request(error.config)
          
        } catch (error) {
          // 刷新失败
          // 1. 移除token
          store.dispatch(logout())
          // 2. 跳转到登录页
          // window.location.href = '/login'
          history.replace('/login', { from: history.location.pathname })
          Toast.show('登陆过期，请重新登陆')
        }
      }

    }
  }
)
export default request