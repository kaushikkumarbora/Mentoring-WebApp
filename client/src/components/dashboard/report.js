import { Form } from "react-bootstrap";

const Report = () => {
    return (
        <Form>
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
    );
}

export default Report;