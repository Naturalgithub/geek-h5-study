import { getToken } from '@/utils/storage';
import { Token } from './../../types/data.d';
import { LoginAction } from './../../types/store.d';
const initialState: Token = getToken()

const login = (state = initialState, action: LoginAction): Token => {
  switch (action.type) {
    case 'login/login':
      return action.payload
    case 'login/logout':
      return {
        ...initialState,  // 这是个冗余操作，保持习惯，后面用immer produce就好了
        token: '',
        refresh_Token:''
      }
    default:
      return state
  }
}

export default login