import { combineReducers } from 'redux'

import login from './login'
import profile from './profile'

const rootReducers = combineReducers({
  login,
  profile
})


export default rootReducers