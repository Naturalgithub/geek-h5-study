import request from '@/utils/request';
import { LoginForm } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

export function login(values: LoginForm):RootThunkAction {
  return async dispatch => {
    const res = await request.post('/authorization', values)
    console.log(res)
    dispatch({
     type:'login/login'
    })
  }  
}