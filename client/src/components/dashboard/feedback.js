import { Form } from "react-bootstrap";

const Feedback = () => {
    return (
        <Form>
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
    );
}

export default Feedback;