import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userActions } from '../_actions';
import DisplayResults from './DisplayResults';


class Profile extends React.Component {

    calculateStats() {
        const { games } = this.state;
        let rounds = {min : 325420, max : -1, avg : 0};
        let bullseye = {min : 325420, max : -1, avg : 0};
        let miss = {min : 325420, max : -1, avg : 0};
        rounds.count = 0;
        for(let i = 0;i < games.length;i++) {
            let currRoundNumber = Math.floor((games[i].shots.length - 1) / (3 * games[i].players.length) + 1);
            if(games[i].players[0] == this.state.username) {
                rounds.min = Math.min(rounds.min, currRoundNumber);
                rounds.max = Math.max(rounds.max, currRoundNumber);
                rounds.avg += currRoundNumber;
                rounds.count++;

                let shots = games[i].shots;
                let currBullseyeNumber = 0;
                let currMissNumber = 0;
                for(let j = 0;j < shots.length;j++) {
                    if(shots[j].points === 25 || shots[j].points === 50) {
                        currBullseyeNumber++;
                    }

                    if(shots[j].poins === 0) {
                        currMissNumber++;
                    }
                }

                bullseye.min = Math.min(bullseye.min, currBullseyeNumber);
                bullseye.max = Math.max(bullseye.max, currBullseyeNumber);
                bullseye.avg += currBullseyeNumber;

                miss.min = Math.min(miss.min, currMissNumber);
                miss.max = Math.max(miss.max, currMissNumber);
                miss.avg += currMissNumber;
            }
        }
        if(rounds.count > 0) {
            rounds.avg /= rounds.count;
            bullseye.avg /= rounds.count;
            miss.avg /= rounds.count;
        }

        this.setState({roundsStats : rounds, bullseyeStats : bullseye, missStats : miss });
    }

    componentDidMount() {
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
            this.calculateStats();
        });
        console.log("component did mount");
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            games: [],
            showDetails: false,
            detailsIndex: 0
        };

        this.calculateStats = this.calculateStats.bind(this);
    }

    handleShowDetails(index) {
        console.log(index);
        this.setState({ showDetails: true, detailsIndex: index });
    }

    render() {
        const { username, email, games, detailsIndex, roundsStats, bullseyeStats, missStats } = this.state;
        const display = this.state.showDetails ? (
            <div>
                <DisplayResults game={games[detailsIndex]}  />

                <h3><Link to="/profile">Return</Link></h3>
            </div>
        ) : (
                <div>

                    <h1>{username}</h1>
                    <h2><a href={"mailto:" + email}>{email}</a></h2>

                    <br /><br /><br />

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
                                    <th>Date</th>
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
                                                <td>{game.date}</td>
                                                <td><button className="btn btn-small" onClick={this.handleShowDetails.bind(this, index)}>Game Details</button></td>

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
                    {
                        games.length !== 0 &&
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td>WinRate:</td>
                                    <td colSpan="3">Not Yet Implemented</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Stat</td>
                                    <td>Min</td>
                                    <td>Max</td>
                                    <td>Average</td>
                                </tr>
                                {
                                    roundsStats && roundsStats.count > 0 &&


                                        <tr>
                                            <td>Rounds</td>
                                            <td>{roundsStats.min}</td>
                                            <td>{roundsStats.max}</td>
                                            <td>{Math.round(roundsStats.avg * 1000) / 1000}</td>
                                        </tr>
                                }
                                {
                                    bullseyeStats && roundsStats.count > 0 &&
                                        <tr>
                                            <td>Bullseye</td>
                                            <td>{bullseyeStats.min}</td>
                                            <td>{bullseyeStats.max}</td>
                                            <td>{Math.round(bullseyeStats.avg * 1000) / 1000}</td>
                                        </tr>
                                }
                                {
                                    missStats && roundsStats.count > 0 &&
                                        <tr>
                                            <td>Miss</td>
                                            <td>{missStats.min}</td>
                                            <td>{missStats.max}</td>
                                            <td>{Math.round(missStats.avg * 1000) / 1000}</td>
                                        </tr>
                                }
                            </tbody>
                        </table>


                    }
                </div>)
        return (
            <div className="container">
                {display}
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
