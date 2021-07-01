import { actionTypes } from "../actions/actionTypes";

const initialState = {
    messageDetails: {}
}

const messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MESSAGES_LOADED:
            const { conversationId, messages, hasMoreMessages, lastMessageId } = action.payload;
            const currentConversationMapEntry = state.messageDetails[conversationId];
            const newConversationMapEntry = { hasMoreMessages, lastMessageId, messages: [] };

            if (currentConversationMapEntry) {
                newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
            }

            newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];

            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry;

            return { messageDetails: newMessageDetails };
        default: 
            return state;
    }
}

export default messagesReducer;