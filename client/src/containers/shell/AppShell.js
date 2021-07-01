import { connect } from 'react-redux';
import NavBarTop from '../../components/dashboard/navbar'
import DashBoardContent from '../../components/dashboard/content'
import NavBar from '../../components/home/navbar'
import Signin from '../../components/home/signin'
import RegisterIn from '../../components/home/register';
import ContentLanding from '../../components/home/content'
import { loggedIn, loggedOut } from '../../store/actions';

const AppShell = ({
    id,
    username,
    usertype,
    accessToken,
    loggedIn,
    loggedOut
}) => {
    return (
        <div>
            {(() => {
                if (id === null) {
                    return (
                        <div>
                            <NavBar />
                            <section>
                                <ContentLanding />
                                <Signin LoginCallback={loggedIn} />
                                <RegisterIn />
                            </section>
                        </div>
                    )
                }
                else {
                    return (
                        <>
                            <header className='sb-nav-fixed'>
                                <NavBarTop LogoutCallback={loggedOut} accessToken={accessToken}/>
                            </header>
                            <section style={{ padding: '70px' }}>
                                <DashBoardContent usertype={usertype} accessToken={accessToken}/>
                            </section>
                        </>
                    )
                }
            })()}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        id: state.loginReducer.id,
        username: state.loginReducer.username,
        usertype: state.loginReducer.usertype,
        accessToken: state.loginReducer.accessToken,
    };
};

const mapDispatchToProps = dispatch => ({
    loggedIn: (id, username, usertype, accessToken) => dispatch(loggedIn(id, username, usertype, accessToken)),
    loggedOut: () => dispatch(loggedOut())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppShell);