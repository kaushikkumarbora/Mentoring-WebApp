import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import ChatShell from '../../containers/shell/ChatShell'

function ChatWrapper(props) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => { setShow(true); console.log(props.otherid) }}>Check Out</Button>
            <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton={{}}>
                    <Modal.Title>Chat - {props.first_name} {props.last_name} - {props.start_date}</Modal.Title>
                </Modal.Header>
                <Modal.Body><ChatShell /></Modal.Body>
            </Modal>
        </>
    )
}

export default ChatWrapper;