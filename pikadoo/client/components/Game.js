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
        this.state = {
            game : props.game,
            doubleOut : props.doubleOut,
            score : myScore,
            win : false,
            shots : []
        }
    }

    handleSelectedPoints(input) {
        this.state.shots.push(input);
        const nextScore = this.state.score - input.points;
        if(nextScore < 0) {
            return;
        }
        if(nextScore == 0) {
            if(this.state.doubleOut && input.quantifier != 2) {
                return;
            }
            //Win
            this.setState({win : true});
            let toSend = {
                game : this.state.game,
                doubleOut : this.state.doubleout,
                shots : this.state.shots
            };
            /*axios.post("/singleplayer", toSend).then(res => {

            });*/
        }
        if(nextScore == 1 && this.state.doubleOut) {
            return;
        }
        this.setState({score : nextScore});
    }

    render() {
        const display = this.state.win ? (
            <DisplayResults game={{shots : this.state.shots}} />
        ) : (
            <div>
                <p>Game: {this.state.game}</p>
                <p>Score: {this.state.score}</p>
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
