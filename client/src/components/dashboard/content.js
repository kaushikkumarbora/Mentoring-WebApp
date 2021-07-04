import { Tab, Tabs} from 'react-bootstrap';
import '../landing.css';
import SearchShell from '../../containers/shell/SearchShell';
import HomeShell from '../../containers/shell/HomeShell';
import Report from './report';
import Feedback from './feedback';
import Event from './events';
import RegisterRecuse from './register_recuse';
import GuardianView from './guardian_view';

const DashBoardContent = ({ accessToken, usertype }) => {

    var Extra = (<></>);

    if (usertype === 'Mentor') {
        Extra = (<RegisterRecuse accessToken={accessToken} />)
    }

    var dashboard = (<Tabs className='customTabs' defautActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
            <HomeShell accessToken={accessToken} usertype={usertype} />
        </Tab>
        <Tab eventKey="report" title="Report">
            <Report accessToken={accessToken} />
        </Tab>
        <Tab eventKey="feedback" title="Feedback">
            <Feedback accessToken={accessToken} />
        </Tab>
        <Tab eventKey="search" title={(usertype === 'Mentor') ? 'Mentee' : 'Mentor'}>
            <SearchShell accessToken={accessToken} usertype={usertype} />
        </Tab>
        <Tab eventKey="application" title="Application">
            <div>Application</div>
        </Tab>
        <Tab eventKey="events" title="Events">
            <Event accessToken={accessToken} usertype={usertype} />
        </Tab>
        <Tab eventKey={(usertype === 'Mentor') ? 'Profile' : 'Contact'} title={(usertype === 'Mentor') ? 'Profile' : 'Contact'} disabled={(usertype === 'Mentor') ? false : true}>
            {Extra}
        </Tab>

    </Tabs>);

    if (usertype === 'Guardian') {
        dashboard = (<Tabs className='customTabs' defautActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
                <GuardianView/>
            </Tab>
        </Tabs>);
    }

    return (
        { dashboard }
    )
}

export default DashBoardContent;