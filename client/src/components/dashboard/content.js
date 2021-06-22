import React from 'react'
import { Tab, Tabs, Card, CardDeck } from 'react-bootstrap'
import '../landing.css'

class DashBoardContent extends React.Component {
    
    domCreateCards = (data) => {
        return (
            <Card style={{ width: '18rem' }} border={(data.expired) ? 'Danger' : 'Success'}>
                <Card.Body>
                    <Card.Title>{data.mentor_first_name} {data.mentor_last_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{(data.expired) ? 'Expired' : 'Active'}</Card.Subtitle>
                    <Card.Text>
                        {data.department}
                    </Card.Text>
                    <Button variant="primary">Check Out</Button>
                </Card.Body>
            </Card>
        );
    }

    render() {
        return (
            <Tabs className='customTabs' defautActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    <CardDeck>{
                        fetch('/chat/0', {
                            method: 'GET'
                        }).then(res => res.json())
                            .then(data => {
                                if (data.status === '200') {
                                    data.chats.map((chat) => this.domCreateCards(chat)) //create Cards
                                }
                            })
                    }</CardDeck>
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