import { User } from "@/types/data";
import { ProfileAction } from "@/types/store";
const initialState: User = {} as User

export default function profile(state = initialState, action: ProfileAction) {

  return state
}