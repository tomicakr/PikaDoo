import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userActions } from '../_actions';

class Profile extends React.Component {
    componentDidMount () {
        console.log("uslooooo");
        // zato što ako se ovo zove /profile, onda se i na backendu mora zvat /profile,
        // a onda ako upisemo /profile rucno u browser napravit ce get zahjev na to i nece prikazat
        // stranicu nego samo json koji dobije
        axios.get("/profileGet", {
            params: {
                username: this.props.user.username
            }
        }).then((res) => {
            this.setState({ ...res.data });
            console.log(res.data);
        });

        console.log("izassloooooo");
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            games: []
        };
    }

    render() {
        const { username, email, games } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Username: {username}</h1>
                <h1>Email: {email}</h1>

                {
                    games.map((game, index) => 
                        <h2 key={index}>{game.user}</h2>
                    )
                }
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
