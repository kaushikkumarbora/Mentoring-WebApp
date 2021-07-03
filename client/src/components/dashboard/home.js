import { CardDeck } from 'react-bootstrap';
import '../landing.css';
import DomCreateCards from './domcard';

const HomeDash = ({ Chats, usertype }) => {
    return (
        <CardDeck style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
            {Chats.map(DomCreateCards(usertype,0))}
        </CardDeck>
    )
}

export default HomeDash;