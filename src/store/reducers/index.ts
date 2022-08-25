import { combineReducers } from 'redux';

import channel from './channel';
import home from './home';
import login from './login';
import profile from './profile';

const rootReducers = combineReducers({
  login,
  profile,
  channel,
  home
})


export default rootReducers