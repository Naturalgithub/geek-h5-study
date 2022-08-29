import { combineReducers } from 'redux';
import article from './article';

import channel from './channel';
import home from './home';
import login from './login';
import profile from './profile';
import search from './search';

const rootReducers = combineReducers({
  login,
  profile,
  channel,
  home,
  search,
  article
})


export default rootReducers