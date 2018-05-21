import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userActions } from '../_actions';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: ''
        };

        console.log(this.props.user.username);

        // zato što ako se ovo zove /profile, onda se i na backendu mora zvat /profile,
        // a onda ako upisemo /profile rucno u browser napravit ce get zahjev na to i nece prikazat
        // stranicu nego samo json koji dobije
        axios.get("/profileGet", {
            params: {
                username: this.props.user.username
            }
        }).then((res) => {
            this.setState({ ...res.data });
        });
    }

    render() {
        const { username, email } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Username: {username}</h1>
                <h1>Email: {email}</h1>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(Profile);
