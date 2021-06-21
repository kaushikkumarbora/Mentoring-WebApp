import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import '../landing.css'

class DashBoardContent extends React.Component {
    render() {
        return (
            <Tabs className='customTabs' defautActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    <div>HomeContent</div>
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