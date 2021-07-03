import { combineReducers } from 'redux';

import conversationState from './conversations';
import loginState from './login';
import messagesState from './messages';
import dashboardState from './dashboard';

export default combineReducers({
  loginState,
  dashboardState,
  conversationState,
  messagesState
});