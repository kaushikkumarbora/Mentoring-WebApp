import { CardDeck } from 'react-bootstrap';
import '../landing.css';
import DomCreateCards from './domcard';

const Search = ({ Users, usertype }) => {

    return (
        <>
            <CardDeck style={{ padding: '1rem', display: 'flex', flexDirection: 'row' }}>{Users.map(DomCreateCards(usertype))}</CardDeck>
        </>
    );
}

export default Search;