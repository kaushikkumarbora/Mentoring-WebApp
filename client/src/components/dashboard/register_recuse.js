import React from "react";
import { Alert , Button} from "react-bootstrap";
import "../landing.css";

class RegisterRecuse extends React.Component {

    constructor() {
        super();
        this.state = {
            status: '',
            text: ''
        }
    }

    componentDidMount() {
        this.getStatus();
    }

    getStatus = () => {
        fetch('/status', {
            method: 'GET',
            headers: {
                'x-access-token': this.props.accessToken,
            }
        }).then((response) => response.json())
            .then((data) => {
                this.setState({
                    status: data.status,
                    text: (data.status === 'Active') ? 'Good to know you are Active!' : 'There may be people waiting for you to get back!'
                })
            })
    }

    setStatus = (Mode) => (mode = Mode) => {
        fetch('/status/' + mode, {
            method: 'POST',
            headers: {
                'x-access-token': this.props.accessToken,
            }
        }).then((response) => response.json())
            .then((data) => {
                if (data.status === '200') {
                    this.getStatus();
                }
            })
    }

    render() {
        return (
            <Alert variant={(this.state.status === 'Active')?'success':'warning'}>
                <Alert.Heading>{this.state.status}!</Alert.Heading>
                <p>
                    {this.state.text}
                </p>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-warning" onClick={this.setStatus('recuse')} disabled={(this.state.status === 'Active')?false:true}>
                        Go Inactive!
                    </Button>
                    <Button variant="outline-success" onClick={this.setStatus('register')} disabled={(this.state.status === 'Active')?true:false}>
                        Go Active!
                    </Button>
                </div>
            </Alert>
        );
    }
}

export default RegisterRecuse;