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
        let newGameOrGame = this.state.gameIsRunning ? (
            <Game game={this.state.game} doubleOut={this.state.doubleOut} />
        ) : (
            <div>
                 <button type="button" className="btn btn-lg btn-primary"
                    onClick={() => this.setState({isNewGameClicked : true})}
                 >New Game</button>
            </div>
        );
        if(!this.state.gameIsRunning && this.state.isNewGameClicked) {
            newGameOrGame = (
                <div>
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary"
                           onClick={() => this.setState({game : "501"})}
                           >501</button>
                        <button type="button" className="btn btn-primary"
                           onClick={() => this.setState({game : "301"})}
                           >301</button>
                        <button type="button" className="btn btn-primary"
                           onClick={() => this.setState({game : "701"})}
                           >701</button>
                    </div>

                    <div className="form-check">
                       <input type="checkbox" className="filled-in form-check-input" id="checkbox325"
                           onChange={(evt) => this.setState({doubleOut : evt.target.checked})} />
                       <label className="form-check-label" htmlFor="checkbox325">DoubleOut</label>
                    </div>

                    <button type="button" className="btn btn-primary"
                       onClick={() => this.setState({gameIsRunning : true})}
                       disabled={this.state.game == null}>
                       Begin
                   </button>
               </div>
            );
        }

        return (
            <div className='container'>
                {newGameOrGame}
            </div>
        );
    }
}

export default SinglePlayer;
