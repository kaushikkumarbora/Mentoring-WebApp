import { Tab, Tabs, CardDeck } from 'react-bootstrap';
import '../landing.css';
import SearchShell from '../../containers/shell/SearchShell';
import HomeShell from '../../containers/shell/HomeShell';
import Report from './report';
import Feedback from './feedback';
import Event from './events';

const DashBoardContent = ({ accessToken, usertype }) => {
    return (
        <Tabs className='customTabs' defautActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
                <HomeShell accessToken={accessToken} usertype={usertype} />
            </Tab>
            <Tab eventKey="report" title="Report">
                <Report accessToken={accessToken}/>
            </Tab>
            <Tab eventKey="feedback" title="Feedback">
                <Feedback accessToken={accessToken}/>
            </Tab>
            <Tab eventKey="search" title={(usertype === 'Mentor') ? 'Mentee' : 'Mentor'}>
                <SearchShell accessToken={accessToken} usertype={usertype}/>
            </Tab>
            <Tab eventKey="application" title="Application">
                <div>Application</div>
            </Tab>
            <Tab eventKey="events" title="Events">
                <Event accessToken={accessToken} usertype={usertype}/>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                <div>Contact</div>
            </Tab>
        </Tabs>
    )
}

export default DashBoardContent;