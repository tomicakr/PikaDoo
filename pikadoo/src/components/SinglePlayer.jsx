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
                    <div>
                        <h1>Select game type:
                        <select value={this.state.gameType} onChange={this.handleChange}>
                                <option value="301">301</option>
                                <option value="501">501</option>
                                <option value="701">701</option>
                        </select>
                        </h1>

                        <div className="form-check">
                            <input type="checkbox" className="filled-in form-check-input" id="checkbox325"
                                onChange={(evt) => this.setState({ doubleOut: evt.target.checked })} />
                            <label className="form-check-label" htmlFor="checkbox325">DoubleOut</label>
                        </div>

                        <button type="button" className="btn btn-primary"
                            onClick={() => this.setState({ gameIsRunning: true })}
                            disabled={this.state.gameType == null}>
                            Begin
                        </button>
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
