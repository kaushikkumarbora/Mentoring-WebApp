import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import EventContent from '../../components/dashboard/event-content';
import { fetchEvents } from '../../store/actions'
import React from 'react';

class EventShell extends React.Component {

    componentDidMount() {
        this.props.fetchEvents(this.props.accessToken, this.props.usertype);
    }

    Refresh = () => {
        this.props.fetchEvents(this.props.accessToken, this.props.usertype)
    }

    render() {
        return (
            <>
                <div className="d-flex justify-content-end">
                    <Button variant='success' onClick={this.Refresh}>
                        Refresh
                    </Button>
                </div>
                <EventContent Events={this.props.events} usertype={this.props.usertype} Refresh={this.Refresh} accessToken={this.props.accessToken}/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.dashboardState.events
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEvents: (accessToken, usertype) => dispatch(fetchEvents(accessToken, usertype)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventShell);
