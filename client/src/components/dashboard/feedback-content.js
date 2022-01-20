import { Jumbotron, Table } from "react-bootstrap";
import "../landing.css";

const FeedbackContent = ({ Feedbacks }) => {

    const generateRows = (Feedback, index) => {
        return (
            <tr>
                <td>{index}</td>
                <td>{Feedback.description}</td>
            </tr>)
    }

    return (
        <Jumbotron fluid>
            <h5>Feedback for you!</h5>
            <p>
                This is the place where you can improve yourself!
            </p>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {Feedbacks.map(generateRows)}
                </tbody>
            </Table>
        </Jumbotron>
    );
}

export default FeedbackContent;