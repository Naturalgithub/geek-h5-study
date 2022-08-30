import { Article, Channel, Suggestion, Token, User, UserProfile } from './data.d';
// 存放和redux相关的所有类型
// RootState
// RootAction
// RootThunkAction
// 各个模块的Action

import store from '@/store';
import { ThunkAction } from 'redux-thunk';

// store的state的类型
export type RootState = ReturnType<typeof store.getState>
// 所有的Action的类型
export type RootAction = LoginAction | ProfileAction | ChannelAction | HomeAction | SearchAction | ArticleAction
// thunkAction类型

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// 各个默认的Action - 登陆模块
export type LoginAction = {
  type: 'login/login',
  payload: Token
} | {
  type: 'login/logout'
}

// 各个默认的Action - 个人中心模块
export type ProfileAction = {
  type: 'profile/getUser'
  payload: User
} | {
  type: 'profile/getUserProfile'
  payload: UserProfile
}

// 各个默认的Action - 首页模块-channel
export type ChannelAction = {
  type: 'channel/saveUserChannels'
  payload: Channel[]
} | {
  type: 'channel/saveAllChannels'
  payload: Channel[]
} | {
  type: 'channel/changeActive'
  payload: number
}

export type HomeAction = {
  type: 'home/getArticleList'
  payload: {
    timestamp: number
    channel_id: number
    results: Article[]
  }
} | {
  type: 'home/saveNewArticles'
  payload: {
    channel_id: number
    timestamp: number
    results: Article[]
  }
}

export type SearchAction = {
  type: 'search/suggestion',
  payload: Suggestion
}

export type ArticleAction = {
  type: 'article/setArticleInfo'
  payload: ArticleDetail
} | {
  type: 'article/saveComment'
  payload: CommentRes
}