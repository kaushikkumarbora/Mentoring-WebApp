import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../message/MessageList';
import ChatForm from '../../components/chat-form/ChatForm';
import { addMessage } from '../../store/actions';

import './ChatShell.scss';

const ChatShell = ({ otherID, chatID, accessToken, usertype, onMessageSubmitted }) => {

    const sendMessage = (OtherID, AccessToken, Chatid) => (text, otherID = OtherID, accessToken = AccessToken, chatid = Chatid) => {
        onMessageSubmitted(text, otherID, accessToken, chatid);
    }

    var conversationContent = (
        <>
            <MessageList conversationId={chatID} accessToken={accessToken} usertype={usertype}/>
        </>
    );

    return (
        <div id="chat-container">
            {conversationContent}
            <ChatForm onMessageSubmitted={sendMessage(otherID, accessToken, chatID)} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.loginState.accessToken,
        usertype: state.loginState.usertype
    };
};

const mapDispatchToProps = dispatch => ({
    onMessageSubmitted: (messageText, otherID, accessToken, chatid) => dispatch(addMessage(messageText, otherID, accessToken, chatid))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatShell);