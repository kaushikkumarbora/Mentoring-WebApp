import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useState } from "react";
import "../landing.css";

const Report = ({ accessToken }) => {
    var i, j;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sendReport = () => {
        const [form] = document.querySelectorAll('.reportForm');
        for (i = 0; i < 4; i++) {
            if (form[i].value.length === 0) {
                for (j = 0; j < 4; j++) {
                    form[j].classList.add('is-invalid');
                }
                return;
            }
        }
        var postBody = {
            // TODO change to username later
            title: form[0].value,
            usertype: form[1].value,
            id: form[2].value,
            description: form[3].value,
        };

        fetch('/report', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            body: JSON.stringify(postBody) // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(body => {
                if (body.status === '200') {
                    for (j = 0; j < 4; j++) {
                        form[j].classList.remove('is-invalid');
                    }
                    handleShow();
                }
                else {
                    for (j = 0; j < 4; j++) {
                        form[j].classList.add('is-invalid');
                    }
                }
            });
    }
    return (
        <>
            <Alert variant="warning">
                <Alert.Heading>Warning!</Alert.Heading>
                <p>
                    Warning against Exploitation of Report System. Users found to be exploiting or spamming reports will be given a cooldown!
                </p>
            </Alert>
            <Form className='reportForm'>
                <Form.Group controlId="ReportForm.ReportTitle">
                    <Form.Label>Report Title</Form.Label>
                    <Form.Control type="text" placeholder="Abusive Behaviour" />
                </Form.Group>
                <Form.Group controlId="ReportForm.Usertype">
                    <Form.Label>User Type</Form.Label>
                    <Form.Control as="select">
                        <option>Mentee</option>
                        <option>Mentor</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="ReportForm.UserID">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" placeholder="420" />
                </Form.Group>
                <Form.Group controlId="ReportForm.Description">
                    <Form.Label>Describe your grevience</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={sendReport}>
                Send
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Report Sent!</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>Do not spam reports and wait for a supervisor to review the report.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Report;