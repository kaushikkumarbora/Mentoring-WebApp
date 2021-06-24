import NavBar from '../../components/home/navbar';
import NavBarTop from '../../components/dashboard/navbar';
import SigninForm from '../../components/home/form';
import ContentLanding from '../../components/home/content';
import DashBoardContent from '../../components/dashboard/content';
import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null,
            username: null,
            usertype: null,
            accessToken: null,
            SignedIn: false
        }
    }

    RouteChange = (route, id, username, usertype, accessToken) => {
        if (route === 'signin') {
            this.setState({
                id: id,
                username: username,
                usertype: usertype,
                accessToken: accessToken,
                SignedIn: true
            });
        }
        else if (route === 'signout') {
            this.setState({
                id: null,
                username: null,
                usertype: null,
                accessToken: null,
                SignedIn: false
            })
        }
    }

    onLoginAttempt = (id, username, usertype, accessToken) => {
        this.RouteChange('signin', id, username, usertype, accessToken);
        console.log('signin');
    }

    onLogout = () => {
        this.RouteChange('signout');
        fetch('/signout', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        console.log('signout');
    }

    render() {
        return (
            <div>
                {(() => {
                    if (this.state.SignedIn === false) {
                        return (
                            <div>
                                <NavBar />
                                <section>
                                    <ContentLanding />
                                    <SigninForm Login={this.onLoginAttempt} usertype={this.state.usertype}/>
                                </section>
                            </div>
                        )
                    }
                    else {
                        return (
                            <>
                                <header className='sb-nav-fixed'>
                                    <NavBarTop Logout={this.onLogout} />
                                </header>
                                <section style={{ padding: '70px' }}>
                                    <DashBoardContent accessToken={this.state.accessToken} usertype={this.state.usertype}/>
                                </section>
                            </>
                        )
                    }
                })()}
            </div>
        );
    }
}

export default App;