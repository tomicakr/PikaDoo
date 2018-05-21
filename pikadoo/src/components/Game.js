import React from 'react';
import Board from './Board';
import DisplayResults from './DisplayResults';
import axios from 'axios';
import { Prompt } from 'react-router';
import { connect } from 'react-redux';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let myScore = 0;
        switch(props.gameType) {
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
            gameType : props.gameType,
            doubleOut : props.doubleOut,
            scores : myScores,
            currPlayerIndex : 0,
            win : false,
            shots : [],
            roundStartScore : 0
        };

        window.onbeforeunload = function(){
            return "Are you sure you want to close the window?";
        }
    }

    handleSelectedPoints(input) {
        input.player = this.props.players[this.state.currPlayerIndex];
        input.valid = true;
        this.state.shots.push(input);

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
                
                let game = {
                    gameType : this.state.gameType,
                    doubleOut : this.state.doubleout,
                    players : this.props.players,
                    shots : this.state.shots,
                    scores : this.state.scores,
                    user : this.props.user
                };
                axios.post("/game", { game });
                this.setState({win : true});
            }
        } else if(nextScore == 1 && this.state.doubleOut) {
            nextScore = this.state.roundStartScore;
            endEarly = true;
        }
        scores[this.state.currPlayerIndex] = nextScore;

        while(endEarly && this.state.shots.length % 3 !== 0) {
            this.state.shots.push({
                selectedField : null,
                quantifier : null,
                valid : false,
                player : input.player
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

                <Board onSelectPoints={this.handleSelectedPoints.bind(this)}/>
            </div>
        );
        return (
            <div>
                {display}
                <Prompt message="Game is in progress. Are you sure you want to leave?"/>
            </div>
        );
    }

    componentWillUnmount() {
        window.onbeforeunload = function(){
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