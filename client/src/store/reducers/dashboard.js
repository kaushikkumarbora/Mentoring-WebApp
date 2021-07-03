import { actionTypes } from "../actions/actionTypes";

const initialState = {
  chats: [],
  users: [],
  subset: [],
  feedbacks: [],
  events: []
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_LOADED: {
      const newState = { ...state };
      newState.chats = action.payload.chats;
      return newState;
    }
    case actionTypes.USERS_LOADED: {
      const newState = { ...state };
      newState.users = action.payload.users;
      newState.subset = action.payload.users;
      return newState;
    }
    case actionTypes.FILTERED_USERS: {
      const newState = { ...state };
      newState.subset = action.payload.subset;
      return newState;
    }
    case actionTypes.FEEDBACK_LOADED: {
      const newState = { ...state };
      newState.feedbacks = action.payload.feedbacks;
      return newState;
    }
    case actionTypes.EVENT_LOADED: {
      const newState = { ...state };
      newState.events = action.payload.events;
      return newState;
    }
    default:
      return state;
  }
}

export default dashboardReducer;