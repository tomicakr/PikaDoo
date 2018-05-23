import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userActions } from '../_actions';
import DisplayResults from './DisplayResults';


class Profile extends React.Component {

    calculateStats() {
        const { games } = this.state;
        let rounds = { min: 325420, max: -1, avg: 0 };
        let bullseye = { min: 325420, max: -1, avg: 0 };
        let miss = { min: 325420, max: -1, avg: 0 };
        let winRate = 0;
        rounds.count = 0;
        let wins = 0;
        for (let i = 0; i < games.length; i++) {
            let currRoundNumber = Math.floor((games[i].shots.length - 1) / (3 * games[i].players.length) + 1);
            if (games[i].players.includes(this.state.username)) {
                rounds.min = Math.min(rounds.min, currRoundNumber);
                rounds.max = Math.max(rounds.max, currRoundNumber);
                rounds.avg += currRoundNumber;
                rounds.count++;

                let shots = games[i].shots;
                let currBullseyeNumber = 0;
                let currMissNumber = 0;
                for (let j = 0; j < shots.length; j++) {
                    if (shots[j].points === 25 || shots[j].points === 50) {
                        currBullseyeNumber++;
                    }

                    if (shots[j].points === 0) {
                        currMissNumber++;
                    }
                }

                if (games[i].winner === this.state.username) wins++;

                bullseye.min = Math.min(bullseye.min, currBullseyeNumber);
                bullseye.max = Math.max(bullseye.max, currBullseyeNumber);
                bullseye.avg += currBullseyeNumber;

                miss.min = Math.min(miss.min, currMissNumber);
                miss.max = Math.max(miss.max, currMissNumber);
                miss.avg += currMissNumber;
            }
        }
        if (rounds.count > 0) {
            rounds.avg /= rounds.count;
            bullseye.avg /= rounds.count;
            miss.avg /= rounds.count;
        }

        this.setState({ roundsStats: rounds, bullseyeStats: bullseye, missStats: miss, wins: wins });
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
            res.data.games.sort((a, b) => new Date(a.date) - new Date(b.date));
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
        const { username, email, games, detailsIndex, roundsStats, bullseyeStats, missStats, wins } = this.state;
        const display = this.state.showDetails ? (
            <div>
                <DisplayResults game={games[detailsIndex]} />

                <h3><Link to="/profile"><button className="btn btn-default">Return</button></Link></h3>
            </div>
        ) : (
                <div>
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <div className="jumbotron">
                                <h1>{username.length > 16 ? username.slice(0, 13)+"..." : username}</h1>
                                <h2><a href={"mailto:" + email}>{email.length > 16 ? email.slice(0,13)+"..." : email}</a></h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {
                                games.length !== 0 &&
                                <table className="table table-bordered black-border">
                                    <thead>
                                        <tr className="active">
                                            <th>Stats</th>
                                            <th colSpan="3">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="info">
                                            <td>Games won:</td>
                                            <td colSpan="3">{wins}</td>
                                        </tr>
                                        <tr className="info">
                                            <td>Games lost:</td>
                                            <td colSpan="3">{roundsStats && (roundsStats.count - wins)}</td>
                                        </tr>
                                        <tr className="info">
                                            <td>Win Rate:</td>
                                            <td colSpan="3">{roundsStats && (Math.round((wins / roundsStats.count) * 1000) / 10)}%</td>
                                        </tr>
                                        <tr className="active">
                                            <td></td>
                                            <th>Min</th>
                                            <th>Max</th>
                                            <th>Average</th>
                                        </tr>
                                        {
                                            roundsStats && roundsStats.count > 0 &&


                                            <tr className="info">
                                                <td>Rounds</td>
                                                <td>{roundsStats.min}</td>
                                                <td>{roundsStats.max}</td>
                                                <td>{Math.round(roundsStats.avg * 1000) / 1000}</td>
                                            </tr>
                                        }
                                        {
                                            bullseyeStats && roundsStats.count > 0 &&
                                            <tr className="info">
                                                <td>Bullseye</td>
                                                <td>{bullseyeStats.min}</td>
                                                <td>{bullseyeStats.max}</td>
                                                <td>{Math.round(bullseyeStats.avg * 1000) / 1000}</td>
                                            </tr>
                                        }
                                        {
                                            missStats && roundsStats.count > 0 &&
                                            <tr className="info">
                                                <td>Miss</td>
                                                <td>{missStats.min}</td>
                                                <td>{missStats.max}</td>
                                                <td>{Math.round(missStats.avg * 1000) / 1000}</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>

                            }
                        </div>
                    </div>
                    <hr />
                    <div>
                        {
                            games.length !== 0 &&

                            <table className="table table-bordered">
                                <thead>
                                    <tr className="active">
                                        <th className="text-center">Number</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Mode</th>
                                        <th className="text-center">Number Of Players</th>
                                        <th className="text-center">Winner</th>
                                        <th className="text-center">Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        games.map((game, index) => {
                                            return (
                                                <tr className="info" key={index}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center">{game.gameType}</td>
                                                    <td className="text-center">{game.mode}</td>
                                                    <td className="text-center">{game.players.length}</td>
                                                    <td className="text-center">{game.winner}</td>
                                                    <td className="text-center">{game.date}</td>
                                                    <td className="text-center"><button className="btn btn-small" onClick={this.handleShowDetails.bind(this, index)}>Game Details</button></td>

                                                </tr>
                                            );
                                        }
                                        ).reverse()
                                    }
                                </tbody>
                            </table>
                        }
                        {
                            games.length === 0 &&
                            <p>User hasn't been involved in any games yet.</p>
                        }

                    </div>
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
