import request from '@/utils/request';
import { ApiResponse, User, UserProfile } from './../../types/data.d';
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


/**
 * @description: 获取个人信息详情
 * @return {*}
 */
export function getUserProfile(): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<UserProfile>>('/user/profile')
    dispatch({
      type: 'profile/getUserProfile',
      payload:res.data.data
    })
  }
}


/**
 * @description: 修改昵称和简介
 * @param {string} key
 * @param {string} value
 * @return {*}
 */
export const updateUserProfile = ( key: string, value: string ): RootThunkAction => {
  return async dispatch => {
    await request.patch('/user/profile', {
      // 属性表达式
      [key]:value
    })
    
    // 更新简介
    dispatch(getUserProfile())
  }
}