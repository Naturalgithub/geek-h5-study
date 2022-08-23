import request from '@/utils/request';
import { removeToken, setToken } from '@/utils/storage';
import { Toast } from 'antd-mobile';
import { ApiResponse, LoginForm, Token } from './../../types/data.d';
import { LoginAction, RootThunkAction } from './../../types/store.d';

export function login(values: LoginForm): RootThunkAction {
  return async dispatch => {
    const res = await request.post<ApiResponse<Token>>('/authorizations', values)
    // 存储在redux中
    dispatch({
      type: 'login/login',
      payload: res.data.data
    })
    // 存储在localStora中 是存一个对象不要搞错了
    setToken(res.data.data)
  }
}

export function getCode(mobile: string): RootThunkAction {
  return async dispatch => {
    const res = await request.get(`/sms/codes/${mobile}`)
    console.log(res)
    Toast.show('成功发送验证码！')
    // dispatch(
  }
}

export function logout(): LoginAction {
  removeToken()
  return {
    type:'login/logout'
  }
}