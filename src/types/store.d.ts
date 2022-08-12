import store from "@/store";
import { ThunkAction } from "redux-thunk";
 
// state的state的类型 
// ReturnType是一个泛型工具类型，可以获取一个函数类型的返回值类型
export const RootState = ReturnType<typeof store.getState>
// 所有Action数据
export type RootAction = LoginAction
//thunkAction类型
export type RootThunkAction = ThunkAction<void,RootAction,unknown,RootAction>

// 各个默认的action
export type LoginAction = {
  type:'login/login'
}