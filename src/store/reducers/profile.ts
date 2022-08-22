import { User } from "@/types/data";
import { ProfileAction } from "@/types/store";
import produce from 'immer';
import { UserProfile } from './../../types/data.d';

type ProfileStateType = {
  user: User
  userProfile:UserProfile
}

const initialState: ProfileStateType = {
  user: {} as User,
  userProfile:{} as UserProfile
}

// produce两个参数，第一个是回调函数，第二个是初始值

const profile = produce((draft, action: ProfileAction) => {
  if (action.type === 'profile/getUser') {
    draft.user = action.payload
  }
  if (action.type === 'profile/getUserProfile') {
    draft.userProfile = action.payload
  }
  
}, initialState)

export default profile