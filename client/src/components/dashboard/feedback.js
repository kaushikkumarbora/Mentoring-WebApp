import { Form, Modal, Button, Alert} from "react-bootstrap";
import { useState } from "react";
import "../landing.css";
import FeedbackShell from "../../containers/shell/FeedbackShell";

const Feedback = ({accessToken}) => {
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);

    var i,j;

    const handleCloseA = () => setShowA(false);
    const handleShowA = () => setShowA(true);
    
    const handleCloseB = () => setShowB(false);
    const handleShowB = () => setShowB(true);

    const sendFeedback = () => {
        const [form] = document.querySelectorAll('.feedbackForm');
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

        fetch('/feedback', {
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
                    handleCloseA();
                    handleShowB();
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
            <Alert variant="success">
                <Alert.Heading>Give Feedback</Alert.Heading>
                <p>
                    Before giving feedback, remind yourself why you are doing it.
                    The purpose of giving feedback is to improve the situation or the person's performance.
                    You won't accomplish that by being harsh, critical or offensive.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="outline-success" onClick={handleShowA}>
                        New Feedback
                    </Button>
                </div>
            </Alert>
            <Alert show={showB} variant="success">
                <Alert.Heading>Done!</Alert.Heading>
                <p>
                    Feedback Sent!
                </p>
                <Button variant="outline-success" onClick={handleCloseB}>
                    Close
                </Button>
            </Alert>
            <FeedbackShell accessToken={accessToken}/>
            <Modal show={showA} onHide={handleCloseA} dialogClassName="modal-90w" className='modal-custom-width'>
                <Modal.Header>
                    <Modal.Title>New Feedback</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseA}></button>
                </Modal.Header>
                <Modal.Body>
                    <Form className='feedbackForm'>
                        <Form.Group controlId="FeedbackForm.FeedbackTitle">
                            <Form.Label>Feedback Title</Form.Label>
                            <Form.Control type="text" placeholder="Improvement in Teaching/Studying" />
                        </Form.Group>
                        <Form.Group controlId="FeedbackForm.Usertype">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control as="select">
                                <option>Mentee</option>
                                <option>Mentor</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="FeedbackForm.UserID">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" placeholder="420" />
                        </Form.Group>
                        <Form.Group controlId="FeedbackForm.Description">
                            <Form.Label>Describe your feedback</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseA}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendFeedback}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default Feedback;