import React from 'react';
import Game from './Game';
import { connect } from 'react-redux';

class MultiPlayer extends React.Component {
    componentDidMount () {
        this.handleNumberOfPlayersChange({target: {value: 2}});
    }

    constructor(props) {
        super(props);

        this.state = {
            gameType : "301",
            doubleOut : false,
            numOfPlayers : 2,
            players : [this.props.user.username],
            gameIsRunning : false
        };

        this.handleNumberOfPlayersChange = this.handleNumberOfPlayersChange.bind(this);
    }

    handleNumberOfPlayersChange(e) {
        const numOfPlayers = e.target.value;
        if(numOfPlayers < 2 || numOfPlayers > 8) return;

        let { players } = this.state;
        if(numOfPlayers > players.length) {
            for(let i = players.length;i < numOfPlayers;i++) {
                players.push("Player " + (i + 1));
            }
        } else {
            players = players.slice(0, numOfPlayers);
        }

        this.setState({numOfPlayers, players});
    }

    render() {
        if(!this.state.gameIsRunning) {
            return (
                <div className="container">
                    <h1>Select game type:
                        <select value={this.state.gameType} onChange={(evnt) => this.setState({gameType : evnt.target.value})}>
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


                    <label>
                      Number of Players:
                      <input type="number" value={this.state.numOfPlayers}
                        onChange={this.handleNumberOfPlayersChange} />
                    </label>

                    <div>
                        {this.state.players.map((player, index) => {
                            return (
                                <input type="text" value={player} key={index} onChange={(e) => {
                                    let { players } = this.state;
                                    players[index] = e.target.value;
                                    this.setState({players});
                                }}/>
                            );
                        })}
                    </div>

                    <button type="button" className="btn btn-lg btn-primary"
                        onClick={() => this.setState({gameIsRunning : true})}
                        disabled={this.state.numOfPlayers < 2}>
                        Begin
                    </button>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Game gameType={this.state.gameType} doubleOut={this.state.doubleOut} players={this.state.players} />
                </div>
            );
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


export default connect(mapStateToProps)(MultiPlayer);
