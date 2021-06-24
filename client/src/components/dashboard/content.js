import React from 'react';
import ChatWrapper from './chatwrapper';
import { Tab, Tabs, Card, CardDeck, Button} from 'react-bootstrap';
import '../landing.css';

class DashBoardContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };
    }

    componentWillMount() {
        fetch('/chat/0', {
            method: 'GET',
            headers: {
                'x-access-token': this.props.accessToken,
            }
        }).then(data => data.json())
            .then(chats => this.setState({ chats: chats }));
    }

    DomCreateCardsMentee = (data) => {
        /*mentee
        {
            "mentor_id": "1",
            "start_date": "2021-04-20",
            "end_date": null,
            "mentor": {
                "first_name": "Aston",
                "last_name": "Montoya",
                "dept": {
                    "name": "Electronics Engineering"
                }
            }
        }*/
        return (
            <div style={{ padding: '1rem' }}>
                <Card style={{ width: '18rem' }} border={(data.end_date) ? 'danger' : 'success'}>
                    <Card.Body>
                        <Card.Title>{data.mentor.first_name} {data.mentor.last_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{(data.end_date) ? 'Expired' : 'Active'}</Card.Subtitle>
                        <Card.Text>
                            {data.mentor.dept.name}
                        </Card.Text>
                        <ChatWrapper first_name={data.mentor.first_name} last_name={data.mentor.last_name} start_date={data.start_date} usertype={this.props.usertype} otherid={data.mentor_id}/>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    DomCreateCardsMentor = (data) => {
        /*mentor
        {
            "mentee_id": "1",
            "start_date": "2021-04-20",
            "end_date": null,
            "mentee": {
                "first_name": "Kaushik",
                "last_name": "Bora"
            }
        }*/
        return (
            <div style={{ padding: '1rem' }}>
                <Card style={{ width: '18rem' }} border={(data.end_date) ? 'danger' : 'success'}>
                    <Card.Body>
                        <Card.Title>{data.mentee.first_name} {data.mentee.last_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{(data.end_date) ? 'Expired' : 'Active'}</Card.Subtitle>
                        <Card.Text>
                            Student
                        </Card.Text>
                        <ChatWrapper first_name={data.mentor.first_name} last_name={data.mentor.last_name} start_date={data.start_date} usertype={this.props.usertype} otherid={data.mentee_id}/>
                    </Card.Body>
                </Card >
            </div>
        );
    }

    render() {
        return (
            <Tabs className='customTabs' defautActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    <CardDeck style={{ padding: '1rem', display: 'flex', flexDirection: 'row' }}>{(this.props.usertype === 'Mentor') ? this.state.chats.map(this.DomCreateCardsMentor) : this.state.chats.map(this.DomCreateCardsMentee)}</CardDeck>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    <div>Profile</div>
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    <div>Contact</div>
                </Tab>
            </Tabs>
        )
    }
}

export default DashBoardContent;