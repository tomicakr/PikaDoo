import React from 'react';
import Board from './Board';
import DisplayResults from './DisplayResults';
import axios from 'axios';
import { Prompt } from 'react-router'

class Game extends React.Component {
    constructor(props) {
        super(props);
        let myScore = 0;
        switch(props.game) {
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
            game : props.game,
            doubleOut : props.doubleOut,
            scores : myScores,
            currPlayerIndex : 0,
            win : false,
            shots : [],
            rounds: [{
                player: "luka",
                shots: [(1, 10),(3, 60),(2, 6)]
            },
            {
                player: "tomica",
                shots: [(1, 10), "miss"]
            }],
            round : 1
        }
    }

    handleSelectedPoints(input) {
        const { round, rounds } = this.state;
        input.player = this.props.players[this.state.currPlayerIndex];
        rounds[round - 1].shots.push((input.quantifier, input.points)); // push za svaki shot
        input.valid = true;
        const { scores } = this.state;
        const currScore = scores[this.state.currPlayerIndex];
        if(this.state.shots.length % 3 === 1) {
            this.state.roundStartScore = currScore;
        }

        let nextScore = currScore - input.points;
        let endEarly = false;
        if(nextScore < 0) {
            nextScore = this.state.roundStartScore;
            endEarly = true;
        } else if(nextScore == 0) {
            if(this.state.doubleOut && input.quantifier != 2) {
                nextScore = this.state.roundStartScore;
                endEarly = true;
            } else {
                //Win
                this.setState({win : true});
                let toSend = {
                    game : this.state.game,
                    doubleOut : this.state.doubleout,
                    players : this.props.players,
                    shots : this.state.shots
                };
                /*axios.post("/singleplayer", toSend).then(res => {

                });*/
            }
        } else if(nextScore == 1 && this.state.doubleOut) {
            nextScore = this.state.roundStartScore;
            endEarly = true;
        }
        scores[this.state.currPlayerIndex] = nextScore;
        if(this.state.shots.length % 3 == 0 || endEarly) {
            let { rounds, players, currPlayerIndex } = this.state;
            currPlayerIndex = (currPlayerIndex + 1) % this.props.players.length;
            rounds.push({player: players[currPlayerIndex], shots: []});
            this.setState({rounds, currPlayerIndex});

        while(endEarly && this.state.shots.length % 3 !== 0) {
            this.state.shots.push({
                selectedField : null,
                quantifier : null,
                valid : false,
                player : this.props.players[this.state.currPlayerIndex]
            });
        }
        if(this.state.shots.length % 3 === 0) {
            this.state.currPlayerIndex = (this.state.currPlayerIndex + 1) % this.props.players.length;
        }
        this.setState({scores});
    }

    render() {
        const display = this.state.win ? (
            <DisplayResults game={{shots : this.state.shots}} players={this.props.players}/>
        ) : (
            <div className="container">
                <p>Game: {this.state.game}</p>
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

                <Board onSelectPoints={this.handleSelectedPoints.bind(this)}/>
            </div>
        );
        return (
            <div>
                {display}
                <Prompt message="Are you sure you want to leave?"/>
            </div>
        );
    }
}

export default Game;
