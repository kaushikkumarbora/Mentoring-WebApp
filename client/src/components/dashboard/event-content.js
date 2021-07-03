import { Jumbotron } from "react-bootstrap";
import "../landing.css";
import DomCreateCards from './domcard';

const EventContent = ({ Refresh, usertype, Events, accessToken }) => {

    return (
        <Jumbotron fluid>
            <h5>Events for you!</h5>
            <p>
                This is the place where you can Check all the events!
            </p>
            {Events.map(DomCreateCards(usertype,2, Refresh, accessToken))}
        </Jumbotron>
    );
}

export default EventContent;