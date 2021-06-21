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
            SignedIn: false
        }
    }

    RouteChange = (route) => {
        if (route === 'signin') {
            this.setState({ SignedIn: true });
        }
        else if (route === 'signout') {
            this.setState({ SignedIn: false })
        }
    }

    onLoginAttempt = () => {
        this.RouteChange('signin');
        console.log('signin');
    }

    onLogout = () => {
        this.RouteChange('signout');
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
                                    <SigninForm Login={this.onLoginAttempt} />
                                </section>
                            </div>
                        )
                    }
                    else {
                        return (
                            <>
                                <header className='sb-nav-fixed'>
                                    <NavBarTop Logout={this.onLogout}/>
                                </header>
                                <section style={{padding:'70px'}}>
                                    <DashBoardContent />
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