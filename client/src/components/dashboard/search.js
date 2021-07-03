import { CardDeck } from 'react-bootstrap';
import '../landing.css';
import DomCreateCards from './domcard';

const Search = ({ Users, usertype }) => {

    return (
        <>
            <CardDeck style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>{Users.map(DomCreateCards(usertype,1))}</CardDeck>
        </>
    );
}

export default Search;