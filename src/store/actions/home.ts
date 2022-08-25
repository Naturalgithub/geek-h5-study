import request from '@/utils/request';
import { ApiResponse, Channel } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

/**
 * @description: 获取用户channels
 * @param {*} RootThunkAction
 * @return {*}
 */
export const getUserChannel = (): RootThunkAction => {
  return async dispatch => {
    const res = await request.get<ApiResponse<{ channels: Channel[] }>>('/user/channels')
    console.log('actios频道',res.data.data)
    const {channels} = res.data.data
    dispatch({
      type: 'home/saveUserChannels',
      payload:channels
    })
  }
 }