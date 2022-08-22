import { User } from "@/types/data";
import { ProfileAction } from "@/types/store";
import produce from 'immer';

type ProfileStateType = {
  user:User
}

const initialState: ProfileStateType = {
  user: {} as User
}

// produce两个参数，第一个是回调函数，第二个是初始值

const profile = produce((draft, action: ProfileAction) => {
  if (action.type === 'profile/getUser') {
    draft.user = action.payload
  }
}, initialState)

export default profile