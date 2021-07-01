import { combineReducers } from 'redux';

import conversationState from './conversations';
import loginReducer from './login';
import messagesState from './messages';
import dashboardReducer from './dashboard';

export default combineReducers({
  loginReducer,
  dashboardReducer,
  conversationState,
  messagesState
});