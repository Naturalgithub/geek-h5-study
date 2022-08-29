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
      const newState = { ...state }
      // newState.articles[action.payload.channel_id] = action.payload
      // 需要在原来的基础上追加results数据
      const old = newState.articles[action.payload.channel_id]?.results ?? []
      newState.articles[action.payload.channel_id] = {
        timestamp: action.payload.timestamp,
        results: [...old, ...action.payload.results]
      }
      return newState

    default:
      return state
  }
}