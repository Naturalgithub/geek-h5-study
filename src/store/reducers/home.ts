import { Channel } from './../../types/data.d';
import { HomeAction } from './../../types/store.d';

type HomeType = {
  userChannels: Channel[]
  allChannels: Channel[]
}

const initialState: HomeType = {
  userChannels: [],
  allChannels: []
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
    default:
      return state
  }

}
