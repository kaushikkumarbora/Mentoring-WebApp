import { Form } from "react-bootstrap";

const Event = () => {
    return (
        <Form>
            <Form.Group controlId="EventForm.EventTitle">
                <Form.Label>Event Title</Form.Label>
                <Form.Control type="text" placeholder="Improvement in Teaching/Studying" />
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
                <Form.Control type="text" placeholder="17/04/2021" />
            </Form.Group>
            <Form.Group controlId="EventForm.Time">
                <Form.Label>Time</Form.Label>
                <Form.Control type="text" placeholder="5:30 PM" />
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
    );
}

export default Event;