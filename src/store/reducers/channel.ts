import { Channel } from './../../types/data.d';
import { ChannelAction } from './../../types/store.d';

type ChannelType = {
  userChannels: Channel[]
  allChannels: Channel[]
  active: number
}

const initialState: ChannelType = {
  userChannels: [],
  allChannels: [],
  active: 0 // 默认高亮
}

export default function channel(state = initialState, action: ChannelAction): ChannelType {
  switch (action.type) {
    case 'channel/saveUserChannels':
      return {
        ...state,
        userChannels: action.payload
      }

    case 'channel/saveAllChannels':
      return {
        ...state,
        allChannels: action.payload
      }

    case 'channel/changeActive':
      return {
        ...state,
        active: action.payload
      }

    default:
      return state
  }

}
