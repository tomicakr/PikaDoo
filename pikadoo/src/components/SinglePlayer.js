import React from 'react';
import Game from './Game';
import { connect } from 'react-redux';


class SinglePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameIsRunning : false,
            isNewGameClicked : false,
            game : "301",
            doubleOut : false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const selected = event.target.value;
        this.setState({game : selected});
    }

    render() {
        const { user } = this.props;
        let newGameOrGame = this.state.gameIsRunning ? (
            <Game game={this.state.game} doubleOut={this.state.doubleOut} players={[user.username]}/>
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

                    <h1>Select game type:
                        <select value={this.state.game} onChange={this.handleChange}>
                            <option value="301">301</option>
                            <option value="501">501</option>
                            <option value="701">701</option>
                        </select>
                    </h1>

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
function mapStateToProps(state) {
    const { authentication } = state;
    const { user, loggedIn } = authentication;
    return {
        user,
        loggedIn
    };
}

export default connect(mapStateToProps)(SinglePlayer);
