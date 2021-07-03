import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import Message from '../../components/message/Message';
import { fetchMessages } from '../../store/actions';
import './MessageList.scss';

class MessageList extends React.Component {

    componentDidMount(){
        this.props.fetchMessages(this.props.getMessagesForConversation(this.props.conversationId).id,this.props.conversationId, this.props.getMessagesForConversation(this.props.conversationId).latestMessageId, this.props.getMessagesForConversation(this.props.conversationId).latestMessageDate, this.props.accessToken, this.props.usertype);
    }

    render() {
        const messageDetails = this.props.getMessagesForConversation(this.props.conversationId);
        const messages = messageDetails.messages;
        let messageItems = null;

        if (messages && messages.length > 0) {
            messageItems = messages.slice(0).reverse().map((message, index) => {
                return <Message
                    key={index}
                    isMyMessage={message.isMyMessage}
                    message={message} />;
            });
        }

        return (
            <div id="chat-message-list">
                {messageItems}
            </div>
        );
    }
}

const mapStateToProps = state => {//returning messageDetails[conversationid]
    const getMessagesForConversation = conversationId => {
        return state.messagesState.messageDetails[conversationId];
    }

    return {
        getMessagesForConversation
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMessages: (otherid, chatid, latestMessageId, latestMessageDate, accessToken, usertype) => dispatch(fetchMessages(otherid, chatid, latestMessageId, latestMessageDate, accessToken, usertype))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);