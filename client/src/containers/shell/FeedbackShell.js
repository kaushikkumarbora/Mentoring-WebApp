import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import FeedbackContent from '../../components/dashboard/feedback-content';
import { fetchFeedbacks } from '../../store/actions'
import React from 'react';

class FeedbackShell extends React.Component {

    componentDidMount() {
        this.props.fetchFeedbacks(this.props.accessToken);
    }

    Refresh = () => {
        this.props.fetchFeedbacks(this.props.accessToken)
    }

    render() {
        return (
            <>
                <div className="d-flex justify-content-end">
                    <Button variant='success' onClick={this.Refresh}>
                        Refresh
                    </Button>
                </div>
                <FeedbackContent Feedbacks={this.props.feedbacks} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        feedbacks: state.dashboardState.feedbacks
    };
};

const mapDispatchToProps = dispatch => ({
    fetchFeedbacks: (accessToken) => dispatch(fetchFeedbacks(accessToken)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedbackShell);
