import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

//import './index.scss';
import rootReducer from './store/reducers';
import App from './containers/App/App';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
