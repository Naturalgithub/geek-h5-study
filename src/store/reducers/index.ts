import { combineReducers } from 'redux'

import home from './home'
import login from './login'
import profile from './profile'

const rootReducers = combineReducers({
  login,
  profile,
  home
})


export default rootReducers