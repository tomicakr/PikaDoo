import React from 'react';
import Game from './Game';
import { connect } from 'react-redux';


class SinglePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameIsRunning: false,
            gameType: "301",
            doubleOut: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const selected = event.target.value;
        this.setState({ gameType : selected });
    }

    render() {
        const { user } = this.props;
        if (!this.state.gameIsRunning) {
            return (
                <div className='container'>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <h2><label htmlFor="selectGameType">Select game type:</label></h2>
                                <select className="form-control" value={this.state.gameType} onChange={this.handleChange} id="selectGameType">
                                        <option value="301">301</option>
                                        <option value="501">501</option>
                                        <option value="701">701</option>
                                </select>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="filled-in form-check-input" id="checkbox325"
                                    onChange={(evt) => this.setState({ doubleOut: evt.target.checked })} />
                                <label className="form-check-label" htmlFor="checkbox325">DoubleOut</label>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-md-2 col-md-offset-5">
                                    <button type="button" className="btn btn-lg btn-primary"
                                        onClick={() => this.setState({gameIsRunning : true})}
                                        disabled={this.state.numOfPlayers < 2}>
                                        Begin
                                    </button>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            );
        } else {
            return (
                <div className='container'>
                    <Game gameType={this.state.gameType} doubleOut={this.state.doubleOut} players={[user.username]} />
                </div>
            )
        }
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
