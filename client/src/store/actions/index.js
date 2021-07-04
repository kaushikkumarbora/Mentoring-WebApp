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

export const feedbacksLoaded = (feedbacks) => ({
    type: actionTypes.FEEDBACK_LOADED,
    payload: {
        feedbacks
    }
})

export const eventsLoaded = (events) => ({
    type: actionTypes.EVENT_LOADED,
    payload: {
        events
    }
})

export const fetchEvents = (accessToken, usertype) => {
    return (dispatch) => {
        return fetch('/event', {
            method: 'GET',
            headers: {
                'x-access-token': accessToken,
            }
        }).then(data => data.json()).then(events => {
            if (usertype === 'Mentor') {
                return events.map(event => {
                    return event = {
                        event_id: event.id,
                        id: event.mentee.id,
                        name: event.mentee.first_name + ' ' + event.mentee.last_name,
                        start_date: event.date,
                        start_time: event.start_time,
                        end_time: event.end_time,
                        status: event.status,
                        venue: event.venue,
                        description: event.description,
                    }
                })
            }
            else if (usertype === 'Mentee') {
                return events.map(event => {
                    return event = {
                        event_id: event.id,
                        id: event.mentor.id,
                        name: event.mentor.first_name + ' ' + event.mentor.last_name,
                        start_date: event.date,
                        start_time: event.start_time,
                        end_time: event.end_time,
                        status: event.status,
                        venue: event.venue,
                        description: event.description,
                    }
                })
            }
        }).then(events => dispatch(eventsLoaded(events)));
    }
}

export const fetchFeedbacks = (accessToken) => {
    return (dispatch) => {
        return fetch('/feedback', {
            method: 'GET',
            headers: {
                'x-access-token': accessToken,
            }
        }).then(data => data.json())
            .then(feedbacks => dispatch(feedbacksLoaded(feedbacks)));
    }
};

export const fetchChat = (accessToken, usertype) => {
    return (dispatch) => {
        return fetch('/chat/0', {
            method: 'GET',
            headers: {
                'x-access-token': accessToken,
            }
        }).then(data => data.json())
            .then(chats => {
                if (usertype === 'Mentor') {
                    return chats.map((chat, index) => {
                        dispatch(makeMessageDetail(index, {
                            id: chat.mentee_id,
                            latestMessageId: null,
                            latestMessageDate: null,
                            messages: []
                        }));
                        return chat = {
                            chat_id: index,
                            id: chat.id,
                            imageUrl: Image,
                            imageAlt: chat.first_name + ' ' + chat.last_name,
                            name: chat.first_name + ' ' + chat.last_name,
                            createdAt: chat.start_date,
                            end_date: chat.end_date,
                            dept_name: null,
                        }
                    })
                }
                else {
                    return chats.map((chat, index) => {
                        dispatch(makeMessageDetail(index, {
                            id: chat.mentor_id,
                            latestMessageId: null,
                            latestMessageDate: null,
                            messages: []
                        }));
                        return chat = {
                            chat_id: index,
                            id: chat.id,
                            imageUrl: Image,
                            imageAlt: chat.first_name + ' ' + chat.last_name,
                            name: chat.first_name + ' ' + chat.last_name,
                            createdAt: chat.start_date,
                            end_date: chat.end_date,
                            dept_name: chat.dept_name,
                        }
                    })
                }
            }).then(chats => dispatch(chatLoaded(chats)));
    }
};

export const fetchMessages = (otherid, chatid, latestMessageId, latestMessageDate, accessToken, usertype) => {
    return (dispatch) => {
        var url = '/chat?';
        url += 'userID=' + otherid;
        url += '&latestMessageDate=' + latestMessageDate;
        url += '&latestMessageId=' + latestMessageId;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': accessToken,
            }
        }).then(data => data.json())
            .then(messages => {
                if (usertype === 'Mentor') {
                    return messages.map((message) => {
                        return message = {
                            id: message.id,
                            messageText: message.text,
                            createdAt: message.date,
                            time: message.time,
                            isMyMessage: (message.message_by === 'mentor')
                        }
                    })
                }
                else {
                    return messages.map((message) => {
                        return message = {
                            id: message.id,
                            messageText: message.text,
                            createdAt: message.date,
                            time: message.time,
                            isMyMessage: (message.message_by === 'mentee')
                        }
                    })
                }
            }).then(messages => {
                dispatch(messagesLoaded(chatid, messages))
            });
    }
};


export const chatLoaded = (chats) => ({
    type: actionTypes.CHAT_LOADED,
    payload: {
        chats
    }
});

export const makeMessageDetail = (index, messagedetail) => ({
    type: actionTypes.MAKE_MESSAGE_DETAIL,
    payload: {
        index,
        messagedetail
    }
});

export const addMessage = (messageText, otherID, accessToken, chatid) => {
    return (dispatch) => {
        return fetch('/message/',{
            method: 'POST',
            headers: {
                'x-access-token': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: otherID,
                text: messageText
            })
        }).then(data => data.json())
            .then(message => {
                if(message.status === '200'){
                    dispatch(messagesLoaded(chatid, [{
                        id: message.id,
                        messageText: messageText,
                        createdAt: message.date,
                        time: message.time,
                        isMyMessage: true
                    }]))
                }
            });
    }
}

export const fetchUsers = (accessToken, usertype) => {
    return (dispatch) => {
        var url;
        if (usertype === 'Mentor') {
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
                if (usertype === 'Mentor') {
                    return users.map(user => {

                        return user = {
                            id: user.id,
                            name: user.first_name + ' ' + user.last_name,
                            usertype: 'Mentor',
                            dept_name: user.dept_name,
                            start_date: user.date_register,
                            end_date: user.date_recuse,
                            dob: user.dob
                        }
                    })
                }
                else if (usertype === 'Mentee') {
                    return users.map(user => {
                        return user = {
                            id: user.id,
                            name: user.first_name + ' ' + user.last_name,
                            usertype: 'Mentee'
                        }
                    })
                }
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

export const messagesRequested = (conversationId, lastMessageId) => ({
    type: actionTypes.MESSAGES_REQUESTED,
    payload: {
        conversationId,
        lastMessageId
    }
});

export const messagesLoaded = (chatid, messages) => ({
    type: actionTypes.MESSAGES_LOADED,
    payload: {
        messages,
        chatid
    }
});