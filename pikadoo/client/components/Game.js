import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let myScore = 0;
        switch(props.game) {
            case "501":
                myScore = 501;
                break;
            case "601":
                myScore = 601;
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
            rounds : []
        }
    }

    handleSelectedPoints(input) {
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
        }
        this.setState({score : nextScore});
    }

    render() {
        const display = this.state.win ? (
            <p>WIN!!!!</p>
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
