import { Token } from './data.d';
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
export type RootAction = LoginAction
// thunkAction类型

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// 各个默认的Action
export type LoginAction = {
  type: 'login/login',
  payload: Token
}