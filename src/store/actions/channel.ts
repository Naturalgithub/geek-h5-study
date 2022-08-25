import request from '@/utils/request';
import { getChannels, hasToken, setChannels } from '@/utils/storage';
import { ApiResponse, Channel } from './../../types/data.d';
import { ChannelAction, RootThunkAction } from './../../types/store.d';

/**
 * @description: 获取用户channels
 * @param {*} RootThunkAction
 * @return {*}
 */
export const getUserChannel = (): RootThunkAction => {
  return async dispatch => {
    // 获取网络数据直接存在redux
    const getServerData = async () => {
      const res = await request.get<ApiResponse<{ channels: Channel[] }>>('/user/channels')
      console.log('actios频道', res.data.data)
      const { channels } = res.data.data
      dispatch({
        type: 'channel/saveUserChannels',
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
          type: 'channel/saveUserChannels',
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

/**
 * @description: 获取所有频道数据
 * @return {*}
 */
export function getAllChannel(): RootThunkAction {

  return async dispatch => {
    const res = await request.get<ApiResponse<{ channels: Channel[] }>>('/channels')
    dispatch({
      type: 'channel/saveAllChannels',
      payload: res.data.data.channels
    })
  }
}

/**
 * @description: 修改高亮
 * @param {number} payload 是id
 * @return {*}
 */
export function changeActive(payload: number): ChannelAction {
  return {
    type: 'channel/changeActive',
    payload
  }
}

/**
 * @description: 添加频道
 * @param {Channel} channel
 * @return {*}
 */
export function addChannel(channel: Channel): RootThunkAction {

  return async (dispatch, getState) => {
    const { userChannels } = getState().channel

    if (hasToken()) {
      // 如果登陆了，发送请求获取频道信息
      await request.patch('/user/channels', {
        channels: [channel],
      })
    } else {
      // 如果没有登录，将频道数据保存到本地
      // 将channels数据保存本地
      setChannels([...userChannels, channel])
    }

    dispatch({
      type: 'channel/saveUserChannels',
      payload: [...userChannels, channel],
    })
  }
}

export function delChannel(channel: Channel): RootThunkAction {

  return async (dispatch, getState) => {
    const {
      channel: { userChannels }
    } = getState()
    const newChannels = userChannels.filter(item => item.id !== channel.id)

    if (hasToken()) {
      await request.put('/user/channels', {
        channels: newChannels,
      })
    } else {
      // 保存本地
      setChannels(newChannels)
    }

    dispatch({
      type: 'channel/saveUserChannels',
      payload: newChannels,
    })
  }
}