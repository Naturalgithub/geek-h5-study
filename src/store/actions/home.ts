import request from '@/utils/request';
import { getChannels, hasToken, setChannels } from '@/utils/storage';
import { ApiResponse, Channel } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

/**
 * @description: 获取用户channels
 * @param {*} RootThunkAction
 * @return {*}
 */
export const getUserChannel = (): RootThunkAction => {
  return async dispatch => {
    // const res = await request.get<ApiResponse<{ channels: Channel[] }>>('/user/channels')
    // console.log('actios频道',res.data.data)
    // const {channels} = res.data.data
    // dispatch({
    //   type: 'home/saveUserChannels',
    //   payload:channels
    // })

    // 获取网络数据直接存在redux
    const getServerData = async () => {
      const res = await request.get<ApiResponse<{ channels: Channel[] }>>('/user/channels')
      console.log('actios频道', res.data.data)
      const { channels } = res.data.data
      dispatch({
        type: 'home/saveUserChannels',
        payload: channels
      })
      return res
    }

    if (hasToken()) {
      // 登陆了
      getServerData()
    } else {
      // 没有登陆 看本地有没有 有就取本地的频道
      const channels = getChannels()
      if (channels.length > 0) {
        dispatch({
          type: 'home/saveUserChannels',
          payload: channels
        })
      } else {
        // 直接获取服务器且保存到本地
        getServerData()
        setChannels((await getServerData()).data.data.channels)
      }

    }

  }
}