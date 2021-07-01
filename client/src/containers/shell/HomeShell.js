import { connect } from 'react-redux';
import { fetchChat } from '../../store/actions';
import React from 'react';
import HomeDash from '../../components/dashboard/home';
const Image = require('../../mentee.png');

class HomeShell extends React.Component {

    componentDidMount(){
        this.props.fetchChat(this.props.accessToken, this.props.usertype);
    }

    render() {
        return (
                <HomeDash Chats={this.props.chats} usertype={this.props.usertype} />
        );
    }
}

const mapStateToProps = state => {
    return {
        chats: state.dashboardReducer.chats
    };
};

const mapDispatchToProps = dispatch => ({
    fetchChat: (accessToken, usertype) => dispatch(fetchChat(accessToken, usertype)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeShell);

/*{id: '1',
imageUrl: require('../../images/profiles/daryl.png'),
imageAlt: 'Daryl Duckmanton',
title: 'Daryl Duckmanton',
createdAt: 'Apr 16',
latestMessageText: 'This is a message',
messages: [
    {
        imageUrl: null,
        imageAlt: null,
        messageText: 'Ok then',
        createdAt: 'Apr 16',
        isMyMessage: true
    },
    {
        imageUrl: require('../../images/profiles/daryl.png'),
        imageAlt: 'Daryl Duckmanton',
        messageText: `
            Yeah I think it's best we do that. Otherwise things won't work well at all.
            I'm adding more text here to test the sizing of the speech bubble and the
            wrapping of it too.
        `,
        createdAt: 'Apr 16',
        isMyMessage: false
        }]
    }*/
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