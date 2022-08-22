import request from '@/utils/request';
import { ApiResponse, User } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

export function getUser(): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<User>>('/user')

    dispatch({
      type: 'profile/getUser',
      payload: res.data.data
    })
  }
}