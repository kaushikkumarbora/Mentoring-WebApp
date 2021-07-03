import { actionTypes } from "../actions/actionTypes";

const initialState = {
  id: null,
  username: null,
  usertype: null,
  accessToken: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGED_IN: {
      const newState = { ...state };
      newState.id = action.payload.id;
      newState.username = action.payload.username;
      newState.usertype = action.payload.usertype;
      newState.accessToken = action.payload.accessToken;
      return newState;
    }
    case actionTypes.LOGGED_OUT: {
      const newState = { ...state };
      newState.id = null;
      newState.username = null;
      newState.usertype = null;
      newState.accessToken = null;
      return newState;
    }
    default:
      return state;
  }
}

export default loginReducer;