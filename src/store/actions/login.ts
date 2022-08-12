import request from '@/utils/request';
import { ApiResponse, LoginForm, Token } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

export function login(values: LoginForm):RootThunkAction {
  return async dispatch => {
    const res = await request.post<ApiResponse<Token>>('/authorizations', values)
    console.log(res)
    dispatch({
      type: 'login/login',
      payload:res.data.data
    })
  }  
}