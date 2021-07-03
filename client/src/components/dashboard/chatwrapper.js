import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import ChatShell from '../../containers/shell/ChatShell';
import './modal-width.css';

function ChatWrapper({chat, otherID}) {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button variant="primary" onClick={() => { setShow(true)}}>Check Out</Button>
            <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" className='modal-custom-width'>
                <Modal.Header style={{background: '#eee'}}>
                    <Modal.Title>Chat - {chat.name} - {chat.createdAt}</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => { setShow(false)}}></button>
                </Modal.Header>
                <Modal.Body>
                    <ChatShell otherID={otherID} chatID={chat.chat_id}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ChatWrapper;