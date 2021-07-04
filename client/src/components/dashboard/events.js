import { Form, Modal, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import "../landing.css";
import EventShell from "../../containers/shell/EventShell";

const Event = ({accessToken, usertype}) => {

    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);

    const handleCloseA = () => setShowA(false);
    const handleShowA = () => setShowA(true);

    const handleCloseB = () => setShowB(false);
    const handleShowB = () => setShowB(true);
    var i, j;

    const sendEvent = () => {
        const [form] = document.querySelectorAll('.eventForm');
        for (i = 0; i < 7; i++) {
            if (form[i].value.length === 0) {
                for (j = 0; j < 7; j++) {
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
            date: form[3].value,
            time: form[4].value,
            venue: form[5].value,
            description: form[6].value,
            add: form[7].value
        };

        fetch('/event', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            body: JSON.stringify(postBody) // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(body => {
                if (body.status === '200') {
                    for (j = 0; j < 7; j++) {
                        form[j].classList.remove('is-invalid');
                    }
                    handleCloseA();
                    handleShowB();
                }
                else {
                    for (j = 0; j < 7; j++) {
                        form[j].classList.add('is-invalid');
                    }
                }
            });
    }

    return (
        <>
            <Alert variant="info">
                <Alert.Heading>Create/Edit Events</Alert.Heading>
                <p>
                    Here you can Create or Edit events. Approved events will be set to 'Not Approced' after an edit. Events that have already taken place cannot be edited or approved.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="outline-info" onClick={handleShowA}>
                        Create/Edit Event
                    </Button>
                </div>
            </Alert>
            <Alert show={showB} variant="success">
                <Alert.Heading>Done!</Alert.Heading>
                <p>
                    Event Created/Updated!
                </p>
                <Button variant="outline-success" onClick={handleCloseB}>
                    Close
                </Button>
            </Alert>
            <EventShell accessToken={accessToken} usertype={usertype}/>
            <Modal show={showA} onHide={handleCloseA} dialogClassName="modal-90w" className='modal-custom-width'>
                <Modal.Header>
                    <Modal.Title>Create/Edit Event</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseA}></button>
                </Modal.Header>
                <Modal.Body>
                    <Form className='eventForm'>
                        <Form.Group controlId="EventForm.EventTitle">
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control type="text" placeholder="Discussion for Hackathon" />
                        </Form.Group>
                        <Form.Group controlId="EventForm.Usertype">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control as="select">
                                <option>Mentee</option>
                                <option>Mentor</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="EventForm.UserID">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" placeholder="420" />
                        </Form.Group>
                        <Form.Group controlId="EventForm.Date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="17/04/2021" />
                        </Form.Group>
                        <Form.Group controlId="EventForm.Time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" placeholder="5:30 PM" />
                        </Form.Group>
                        <Form.Group controlId="EventForm.Venue">
                            <Form.Label>Venue</Form.Label>
                            <Form.Control type="text" placeholder="Google Meet" />
                        </Form.Group>
                        <Form.Group controlId="EventForm.Description">
                            <Form.Label>Describe your Event</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group controlId="EventForm.Additional Notes">
                            <Form.Label>Additional Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseA}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendEvent}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Event;