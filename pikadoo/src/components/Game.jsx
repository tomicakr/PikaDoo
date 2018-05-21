import React from 'react';
import Board from './Board';
import DisplayResults from './DisplayResults';
import axios from 'axios';
import { Prompt } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Game extends React.Component {
    constructor(props) {
        super(props);
        let myScore = 0;
        switch (props.gameType) {
            case "501":
                myScore = 501;
                break;
            case "301":
                myScore = 301;
                break;
            case "701":
                myScore = 701;
                break;
            default:
                myScore = 325;
        }
        let myScores = [];

        for (let i = 1; i <= props.players.length; i++) {
            myScores.push(myScore);
        }

        this.state = {
            gameType: props.gameType,
            doubleOut: props.doubleOut,
            scores: myScores,
            currPlayerIndex: 0,
            win: false,
            shots: [],
            roundStartScore: 0,
            rounds: []
        };

        window.onbeforeunload = function () {
            return "Are you sure you want to close the window?";
        }
    }

    handleSelectedPoints(input) {
        input.player = this.props.players[this.state.currPlayerIndex];
        input.valid = true;
        this.state.shots.push(input);

        const { scores } = this.state;
        const currScore = scores[this.state.currPlayerIndex];
        if (this.state.shots.length % 3 === 1) {
            this.state.rounds.push([{ points: "-", quantifier: "-", valid : true }, { points: "-", quantifier: "-", valid : true}, { points: "-", quantifier: "-", valid : true}]);
            this.state.roundStartScore = currScore;
        }

        let nextScore = currScore - input.points;
        let endEarly = false;
        if (nextScore < 0) {
            nextScore = this.state.roundStartScore;
            endEarly = true;
        } else if (nextScore == 0) {
            if (this.state.doubleOut && input.quantifier != 2) {
                nextScore = this.state.roundStartScore;
                endEarly = true;
            } else {
                //Win

                let game = {
                    gameType: this.state.gameType,
                    doubleOut: this.state.doubleout,
                    players: this.props.players,
                    shots: this.state.shots,
                    scores: this.state.scores,
                    user: this.props.user.username
                };
                axios.post("/game", { game });
                this.setState({ win: true });
            }
        } else if (nextScore == 1 && this.state.doubleOut) {
            nextScore = this.state.roundStartScore;
            endEarly = true;
        }
        scores[this.state.currPlayerIndex] = nextScore;

        if(endEarly) input.valid = false;
        this.state.rounds[this.state.rounds.length - 1][(this.state.shots.length - 1) % 3] = input;

        while (endEarly && this.state.shots.length % 3 !== 0) {
            input.valid = false;
            this.state.shots.push({
                selectedField: null,
                quantifier: null,
                valid: false,
                player: input.player
            });
            this.state.rounds[this.state.rounds.length - 1][(this.state.shots.length - 1) % 3] = input;
        }


        if (this.state.shots.length % 3 === 0) {
            this.state.currPlayerIndex = (this.state.currPlayerIndex + 1) % this.props.players.length;
        }
        this.setState({ scores });
    }

    render() {
        const display = this.state.win ? (
            <div>
                <DisplayResults game={{
                    shots: this.state.shots,
                    gameType : this.state.gameType,
                    players : this.props.players,
                    scores : this.state.scores
                 }}  />
                <h3><Link to={this.props.players > 1 ? "/multiplayer" : "/singleplayer"}>Return</Link></h3>
            </div>
        ) : (
                <div className="container">
                    <p>Game: {this.state.gameType}</p>
                    <p>Player: {this.props.players[this.state.currPlayerIndex]}</p>
                    <p>Score: {this.state.scores[this.state.currPlayerIndex]}</p>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Players:</th>
                                {this.props.players.map((player, index) => {
                                    const active = (this.state.currPlayerIndex === index) ? "warning" : "";
                                    return (
                                        <th className={active} key={index}> {player} </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Scores:</th>

                                {this.state.scores.map((score, index) => {
                                    const active = (this.state.currPlayerIndex == index) ? "active" : "";
                                    return (
                                        <th className={active} key={index}> {score} </th>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>

                    <Board onSelectPoints={this.handleSelectedPoints.bind(this)} />
                    <Prompt message="Game is in progress. Are you sure you want to leave?" />

                    <h3>Rounds</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>Player</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rounds.map((round, index) => {
                                let throw0 = round[0].points === 0 ? "miss" : (round[0].quantifier == "-" ? "-" : round[0].points / round[0].quantifier + " X " + round[0].quantifier);
                                let throw1 = round[1].points === 0 ? "miss" : (round[1].quantifier == "-" ? "-" : round[1].points / round[1].quantifier + " X " + round[1].quantifier);
                                let throw2 = round[2].points === 0 ? "miss" : (round[2].quantifier == "-" ? "-" : round[2].points / round[2].quantifier + " X " + round[2].quantifier);
                                console.log(round);
                                if(!round[0].valid) {
                                    throw0 = "Busted " + (round[0].quantifier == "-" ? "-" : round[0].points / round[0].quantifier + " X " + round[0].quantifier);
                                    throw1 = "---";
                                    throw2 = "---";
                                }
                                else if(!round[1].valid) {
                                    throw1 = "Busted " + (round[1].quantifier == "-" ? "-" : round[1].points / round[1].quantifier + " X " + round[1].quantifier);
                                    throw2 = "---";
                                }
                                else if(!round[2].valid) throw2 = "Busted " + (round[2].quantifier == "-" ? "-" : round[2].points / round[2].quantifier + " X " + round[2].quantifier);
                                return (
                                    <tr key={index}>
                                        <td>{Math.floor(index / this.props.players.length + 1)}</td>
                                        <td> {throw0} </td>
                                        <td> {throw1} </td>
                                        <td> {throw2} </td>
                                        <td> {round[0].player} </td>
                                    </tr>
                                );
                            }).reverse()}
                        </tbody>
                    </table>
                </div>
            );
        return (
            <div>
                {display}
            </div>
        );
    }

    componentWillUnmount() {
        window.onbeforeunload = function () {
        }
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(Game);
