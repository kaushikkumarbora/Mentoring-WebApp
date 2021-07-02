import { connect } from 'react-redux';
import FeedbackContent from '../../components/dashboard/feedback-content';
import { fetchFeedbacks , filteredUsers} from '../../store/actions'
import React from 'react';

class FeedbackShell extends React.Component {

    componentDidMount() {
        this.props.fetchFeedbacks(this.props.accessToken);
    }

    render() {
        return (
            <>
                <FeedbackContent Feedbacks={this.props.feedbacks}/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        feedbacks: state.dashboardReducer.feedbacks
    };
};

const mapDispatchToProps = dispatch => ({
    fetchFeedbacks: (accessToken) => dispatch(fetchFeedbacks(accessToken)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedbackShell);
