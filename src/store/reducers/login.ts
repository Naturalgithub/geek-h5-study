import { getToken } from '@/utils/storage';
import { Token } from './../../types/data.d';
import { LoginAction } from './../../types/store.d';
const initialState: Token = getToken()

const login = (state = initialState, action: LoginAction): Token => {
  switch (action.type) {
    case 'login/login':
      return action.payload
    default:
      return state
  }
}

export default login