import { Jumbotron , CardDeck} from "react-bootstrap";
import "../landing.css";
import DomCreateCards from './domcard';

const EventContent = ({ Refresh, usertype, Events, accessToken }) => {

    return (
        <Jumbotron fluid>
            <h5>Events for you!</h5>
            <p>
                This is the place where you can Check all the events!
            </p>
            <CardDeck style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                {Events.map(DomCreateCards(usertype, 2, Refresh, accessToken))}
            </CardDeck>
        </Jumbotron>
    );
}

export default EventContent;