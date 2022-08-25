import { Channel } from './../../types/data.d';
import { HomeAction } from './../../types/store.d';

type HomeType = {
  userChannels:Channel[]
}

const initialState: HomeType = {
  userChannels:[]
} 

export default function home(state = initialState, action: HomeAction) {
  
  switch (action.type) {
    case 'home/saveUserChannels':
      return {
        ...state,
        userChannels:action.payload
      }
    default:
      return state
  }

}
