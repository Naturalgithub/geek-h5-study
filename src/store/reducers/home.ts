import { Channel } from './../../types/data.d';
import { HomeAction } from './../../types/store.d';

type HomeType = {
  userChannels: Channel[]
  allChannels: Channel[]
  active: number
}

const initialState: HomeType = {
  userChannels: [],
  allChannels: [],
  active: 0 // 默认高亮
}

export default function home(state = initialState, action: HomeAction) {

  switch (action.type) {
    case 'home/saveUserChannels':
      return {
        ...state,
        userChannels: action.payload
      }

    case 'home/saveAllChannels':
      return {
        ...state,
        allChannels: action.payload
      }

    case 'home/changeActive':
      return {
        ...state,
        active: action.payload
      }

    default:
      return state
  }

}
