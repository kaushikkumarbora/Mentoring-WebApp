import { actionTypes } from "./actionTypes";

export const loggedIn = (id, username, usertype, accessToken) => ({
    type: actionTypes.LOGGED_IN,
    payload: {
        id,
        username,
        usertype,
        accessToken,
    }
});

export const loggedOut = () => ({
    type: actionTypes.LOGGED_OUT
});

export const filteredUsers = (subset) => ({
    type: actionTypes.FILTERED_USERS,
    payload: {
        subset
    }
})

export const fetchChat = (accessToken, usertype) => {
    return (dispatch) => {
        return fetch('/chat/0', {
            method: 'GET',
            headers: {
                'x-access-token': accessToken,
            }
        }).then(data => data.json())
            .then(chats => {
                return chats.map(chat => {
                    if (usertype === 'Mentor') {
                        return chat = {
                            id: chat.id,
                            imageUrl: Image,
                            imageAlt: chat.mentee.first_name + ' ' + chat.mentee.last_name,
                            title: chat.mentee.first_name + ' ' + chat.mentee.last_name,
                            createdAt: chat.id_mentor_mentee.start_date,
                            end_date: chat.id_mentor_mentee.end_date,
                            dept_name: null,
                            latestMessageText: null,
                        }
                    }
                    else {
                        return chat = {
                            id: chat.id,
                            imageUrl: Image,
                            imageAlt: chat.mentor.first_name + ' ' + chat.mentor.last_name,
                            title: chat.mentor.first_name + ' ' + chat.mentor.last_name,
                            createdAt: chat.id_mentor_mentee.start_date,
                            end_date: chat.id_mentor_mentee.end_date,
                            dept_name: chat.mentor.dept.name,
                            latestMessageText: null,
                        }
                    }
                })
            }).then(chats => dispatch(chatLoaded(chats)));
    }
};

export const chatLoaded = (chats) => ({
    type: actionTypes.CHAT_LOADED,
    payload: {
        chats
    }
});

export const fetchUsers = (accessToken, usertype) => {
    return (dispatch) => {
        var url;
        if(usertype === 'Mentor'){
            url = '/mentor/0'
        }
        else {
            url = '/mentee/0'
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': accessToken,
            }
        }).then(data => data.json())
            .then(users => {
                return users.map(user => {
                    if (usertype === 'Mentor') {
                        return user = {
                            id: user.id,
                            name: user.first_name + ' ' + user.last_name,
                            usertype: 'Mentor',
                            department: user.dept.name
                        }
                    }
                    else {
                        return user = {
                            id: user.id,
                            name: user.first_name + ' ' + user.last_name,
                            usertype: 'Mentee'
                        }
                    }
                })
            }).then(users => dispatch(usersLoaded(users)));
    }
};

export const usersLoaded = (users) => ({
    type: actionTypes.USERS_LOADED,
    payload: {
        users
    }
});

export const conversationLoaded = conversations => ({
    type: actionTypes.CONVERSATIONS_LOADED,
    payload: {
        conversations,
        selectedConversation: conversations[0]
    }
});

export const conversationChanged = conversationId => ({
    type: actionTypes.SELECTED_CONVERSATION_CHANGED,
    conversationId
});

export const conversationsRequested = () => ({
    type: actionTypes.CONVERSATIONS_REQUESTED
});

export const conversationDeleted = () => ({
    type: actionTypes.DELETE_CONVERSATION
});

export const newMessageAdded = textMessage => ({
    type: actionTypes.NEW_MESSAGE_ADDED,
    textMessage
});

export const messagesRequested = (conversationId, numberOfMessages, lastMessageId) => ({
    type: actionTypes.MESSAGES_REQUESTED,
    payload: {
        conversationId,
        numberOfMessages,
        lastMessageId
    }
});

export const messagesLoaded = (conversationId, messages, hasMoreMessages, lastMessageId) => ({
    type: actionTypes.MESSAGES_LOADED,
    payload: {
        conversationId,
        messages,
        hasMoreMessages,
        lastMessageId
    }
});