import { connect } from 'react-redux';
import { fetchChat } from '../../store/actions';
import { Button } from 'react-bootstrap';
import React from 'react';
import HomeDash from '../../components/dashboard/home';
const Image = require('../../mentee.png');

class HomeShell extends React.Component {

    componentDidMount() {
        this.props.fetchChat(this.props.accessToken, this.props.usertype);
    }

    Refresh = () => {
        this.props.fetchChat(this.props.accessToken, this.props.usertype);
    }

    render() {
        return (
            <>
                <div className="d-flex justify-content-end">
                    <Button variant='success' onClick={this.Refresh}>
                        Refresh
                    </Button>
                </div>
                <HomeDash Chats={this.props.chats} usertype={this.props.usertype} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        chats: state.dashboardState.chats
    };
};

const mapDispatchToProps = dispatch => ({
    fetchChat: (accessToken, usertype) => dispatch(fetchChat(accessToken, usertype)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeShell);