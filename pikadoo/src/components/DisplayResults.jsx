import React from 'react';
import { alertActions } from '../_actions';
import { connect } from 'react-redux';

class DisplayResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shots: props.game.shots
        };

        window.onbeforeunload = function () {
        }
    }

    render() {
        return (
            <div>
                {/*<div className={`alert alert-success`}>Uspješno spremljeno</div>*/}
                <table className="table table-bordered">
                    <thead >
                        <tr className="active">
                            <th className="text-center">Round</th>
                            <th className="text-center">Player</th>
                            <th className="text-center">Points</th>
                            <th className="text-center">Field</th>
                            <th className="text-center">Quantifier</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.shots.map((shot, i) => {
                            const round = Math.floor(i / (3 * this.props.game.players.length) + 1);
                            const field = shot.valid ? shot.points / shot.quantifier : "---";
                            const rowType = (i % 6 >= 3) ? "success" : "warning";
                            const rowTypeFirst = (i % (6 * this.props.game.players.length) >= (3 * this.props.game.players.length)) ? "success" : "warning";
                            const player = this.props.game.players[Math.floor((i % (3 * this.props.game.players.length)) / 3)];
                            return (
                                <tr key={i}>
                                    {i % (3 * this.props.game.players.length) == 0 &&
                                        <td className={"info" + " text-center align-middle"} rowSpan={(3 * this.props.game.players.length)}><h2>{round}</h2></td>
                                    }
                                    {i % 3 == 0 &&
                                        <td className={"info" + " text-center align-middle"} rowSpan="3"><h4>{player}</h4></td>
                                    }
                                    <td className={"info" + " text-center align-middle"}>{shot.points}</td>
                                    <td className={"info" + " text-center align-middle"}>{field}</td>
                                    <td className={"info" + " text-center align-middle"}>{shot.valid ? shot.quantifier : "---"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
                <hr/>

                <div class="table-responsive">

                    <table className="table table-bordered">
                        <thead>
                            <tr className="active text-center align-middle" >
                                <th className="active text-center align-middle">Players: </th>
                                {this.props.game.players.map((player, i) =>
                                    <th className="active text-center align-middle" key={i}>{player}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="info text-center align-middle">Scores: </th>
                                {this.props.game.scores.map((score, i) =>
                                    <td className="info text-center align-middle" key={i}>{score}</td>
                                )}
                            </tr>

                            <tr >
                                <th className="info text-center align-middle">Winner: </th>
                                <td className="info text-center align-middle" colSpan={this.props.game.players.length}>{this.state.shots[this.state.shots.length - 1].player}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(DisplayResults);
