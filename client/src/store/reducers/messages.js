import { actionTypes } from "../actions/actionTypes";

const initialState = {
    messageDetails: []
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGES_LOADED:
            const { messages, chatid } = action.payload;
            const currentConversationMapEntry = state.messageDetails[chatid];
            const newConversationMapEntry = { id: null, latestMessageId: null, latestMessageDate: null, messages: [] };

            newConversationMapEntry.messages = [ ...currentConversationMapEntry.messages, ...messages];

            newConversationMapEntry.id = currentConversationMapEntry.id;
            newConversationMapEntry.latestMessageDate = currentConversationMapEntry.latestMessageDate;
            newConversationMapEntry.latestMessageId = currentConversationMapEntry.latestMessageId;

            const length = newConversationMapEntry.messages.length;
            if (length > 0) {
                newConversationMapEntry.latestMessageDate = newConversationMapEntry.messages[length - 1].createdAt;
                newConversationMapEntry.latestMessageId = newConversationMapEntry.messages[length - 1].id;
            }

            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[chatid] = newConversationMapEntry;

            return { messageDetails: newMessageDetails };
        case actionTypes.MAKE_MESSAGE_DETAIL:
            const newState = { ...state };
            newState.messageDetails[action.payload.index] = action.payload.messagedetail;
            return newState;
        default:
            return state;
    }
}

export default messagesReducer;