import { Token } from './../../types/data.d';
import { LoginAction } from './../../types/store.d';
const initialState:Token= {}  as Token

const login = (state = initialState, action: LoginAction) : Token=> {
switch (action.type) {
  case 'login/login':
     return action.payload
     
  default:
    return state
}
}

export default login