import React from 'react';
import Game from './Game';


class SinglePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameIsRunning : false,
            isNewGameClicked : false,
            game : null,
            doubleOut : false
        }
    }

    render() {
        const newGameOrGame = this.state.gameIsRunning ? (
            <Game game={this.state.game} doubleOut={this.state.doubleOut} />
        ) : (
            <div>
             <button type="button" className="btn btn-lg btn-primary" disabled={this.state.isNewGameClicked}
                onClick={() => this.setState({isNewGameClicked : true})}
             >New Game</button>

             <button type="button" className="btn btn-primary" disabled={! this.state.isNewGameClicked}
                onClick={() => this.setState({gameIsRunning : true, game : "501"})}
                >501</button>
             <button type="button" className="btn btn-primary" disabled={! this.state.isNewGameClicked}
                onClick={() => this.setState({gameIsRunning : true, game : "601"})}
                >601</button>
             <button type="button" className="btn btn-primary" disabled={! this.state.isNewGameClicked}
                onClick={() => this.setState({gameIsRunning : true, game : "701"})}
             >701</button>
             </div>
        );

        return (
            <div className='container'>
                {newGameOrGame}
            </div>
        );
    }
}

export default SinglePlayer;
