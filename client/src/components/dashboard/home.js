import ChatWrapper from './chatwrapper';
import { Tab, Tabs, CardDeck } from 'react-bootstrap';
import '../landing.css';
import DomCreateCards from './domcard';

const HomeDash = ({ Chats, usertype }) => {
    return (
        <CardDeck style={{ padding: '1rem', display: 'flex', flexDirection: 'row' }}>{Chats.map(DomCreateCards(usertype))}</CardDeck>
    )
}

export default HomeDash;