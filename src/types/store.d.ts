import { Token, User } from './data.d';
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
export type RootAction = LoginAction | ProfileAction
// thunkAction类型

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// 各个默认的Action - 登陆模块
export type LoginAction = {
  type: 'login/login',
  payload: Token
}

// 各个默认的Action - 登陆模块
export type ProfileAction = {
  type: 'profile/getUser'
  payload: User
}