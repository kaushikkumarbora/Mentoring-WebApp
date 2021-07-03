import React from 'react';
import classNames from 'classnames';

import './Message.scss';

const Message = ({ isMyMessage, message }) => {
    const messageClass = classNames('message-row', {
        'you-message': isMyMessage,
        'other-message': !isMyMessage
    });

    return (
        <div className={messageClass}>
            <div className="message-content">
                <div className="message-text">
                    {message.messageText}
                </div>
                <div className="message-time">{message.createdAt} {message.time}</div>
            </div>
        </div>
    );
}

export default Message;