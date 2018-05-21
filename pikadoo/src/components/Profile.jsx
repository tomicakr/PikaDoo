import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userActions } from '../_actions';

class Profile extends React.Component {
    componentDidMount() {
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

                <h1>{username}</h1>
                <h2><a href={"mailto:" + email}>{email}</a></h2>

                <br/><br/><br/>

                {
                    games.length !== 0 &&

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Type</th>
                                <th>Mode</th>
                                <th>Number Of Players</th>
                                <th>Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                games.map((game, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{game.gameType}</td>
                                            <td>{game.mode}</td>
                                            <td>{game.players.length}</td>
                                            <td>{game.winner}</td>
                                            <td><button className="btn btn-small">Game Details</button></td>
                                        </tr>
                                    );
                                }
                                )
                            }
                        </tbody>
                    </table>
                }
                {
                    games.length === 0 &&
                    <p>User hasn't been involved in any games yet.</p>
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
