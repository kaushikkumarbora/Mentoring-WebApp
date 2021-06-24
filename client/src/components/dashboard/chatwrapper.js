import { useState } from 'react';
import Chat from './chat';
import {Modal, Button} from 'react-bootstrap';

function ChatWrapper(props) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => { setShow(true); console.log(props.otherid) }}>Check Out</Button>
            <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton={{}}>
                    <Modal.Title>Chat - {props.first_name} {props.last_name} - {props.start_date}</Modal.Title>
                </Modal.Header>
                <Modal.Body><Chat /></Modal.Body>
            </Modal>
        </>
    )
}

export default ChatWrapper;