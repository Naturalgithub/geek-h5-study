import request from '@/utils/request';
import { setToken } from '@/utils/storage';
import { ApiResponse, LoginForm, Token } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

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