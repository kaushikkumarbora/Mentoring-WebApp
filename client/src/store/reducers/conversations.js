import { actionTypes } from "../actions/actionTypes";

const initialState = {
    conversations: [],
    selectedConversation: {}
};

const conversationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONVERSATIONS_LOADED: {
            const newState = { ...state };
            newState.conversations = action.payload.conversations ? action.payload.conversations : [];
            newState.selectedConversation = action.payload.selectedConversation;

            return newState;
        }
      case actionTypes.SELECTED_CONVERSATION_CHANGED: {
        const newState = { ...state };
        newState.selectedConversation = 
            newState.conversations.find(
                conversation => conversation.id === action.conversationId
            );

        return newState;
      }
      case actionTypes.DELETE_CONVERSATION: {
        if (state.selectedConversation) {
            const newState = { ...state };

            let selectedConversationIndex = 
                newState.conversations.findIndex(c => c.id === newState.selectedConversation.id);
            newState.conversations.splice(selectedConversationIndex, 1);

            if (newState.conversations.length > 0) {
                if (selectedConversationIndex > 0) {
                    --selectedConversationIndex;
                }
        
                newState.selectedConversation = newState.conversations[selectedConversationIndex];
            } else {
                newState.selectedConversation = null;
            }

            return newState;
        }
        
        return state;
      }
      case actionTypes.NEW_MESSAGE_ADDED: {
          if (state.selectedConversation) {
            const newState = { ...state };
            newState.selectedConversation = { ...newState.selectedConversation };
            
            newState.selectedConversation.messages.unshift(
                {
                    imageUrl: null,
                    imageAlt: null,
                    messageText: action.textMessage,
                    createdAt: 'Apr 16',
                    isMyMessage: true
                },
            )
    
            return newState;
          }

          return state;
      }
      default:
        return state;
    }
  }
  
export default conversationsReducer;