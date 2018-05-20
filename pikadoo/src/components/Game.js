import React from 'react';
import Board from './Board';
import DisplayResults from './DisplayResults';
import axios from 'axios';

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
            shots : []
        }
    }

    handleSelectedPoints(input) {
        input.player = this.props.players[this.state.currPlayerIndex];
        this.state.shots.push(input);
        const { scores } = this.state;
        const currScore = scores[this.state.currPlayerIndex];
        let nextScore = currScore - input.points;
        let endEarly = false;
        if(nextScore < 0) {
            nextScore = currScore;
            endEarly = true;
        } else if(nextScore == 0) {
            if(this.state.doubleOut && input.quantifier != 2) {
                nextScore = currScore;
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
            nextScore = currScore;
        }
        scores[this.state.currPlayerIndex] = nextScore;
        if(this.state.shots.length % 3 == 0 || endEarly) {
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
            </div>
        );
    }

}

export default Game;
