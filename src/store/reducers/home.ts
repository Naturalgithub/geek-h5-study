import { Article } from '@/types/data';
import { HomeAction } from './../../types/store.d';

type HomeStateType = {
  articles: {
    [key: number]: {
      timestamp: number
      results: Article[]
    }
  }
}

const homeState = {
  articles: {}
} as HomeStateType
export default function home(state = homeState, action: HomeAction): HomeStateType {
  switch (action.type) {
    case 'home/getArticleList':
      state.articles[action.payload.channel_id] = action.payload
      return state

    default:
      return state
  }
}