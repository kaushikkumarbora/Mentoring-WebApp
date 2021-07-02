import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Search from '../../components/dashboard/search';
import { fetchUsers , filteredUsers} from '../../store/actions'
import React from 'react';

class SearchShell extends React.Component {

    componentDidMount() {
        this.props.fetchUsers(this.props.accessToken, (this.props.usertype === 'Mentor')?'Mentee':'Mentor');
    }

    onInputChange = (event) => {
        window.scrollTo(0, 0);
        if(event.target.value.length !== 0){
            var filtered = this.props.users.filter( user => user.name.toLowerCase().includes(event.target.value.toLowerCase()));
            this.props.filteredUsers(filtered);
        }
        else{
            this.props.filteredUsers(this.props.users);
        }
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Control type="text" placeholder="Search..." onChange={this.onInputChange}/>
                    <Form.Text className="text-muted">
                        Search for the names of the users.
                    </Form.Text>
                </Form>
                <Search Users={this.props.subset} usertype={this.props.usertype} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.dashboardReducer.users,
        subset: state.dashboardReducer.subset
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUsers: (accessToken, usertype) => dispatch(fetchUsers(accessToken, usertype)),
    filteredUsers: (subset) => dispatch(filteredUsers(subset)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchShell);
