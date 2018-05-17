import React from 'react';
class DisplayResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shots : props.game.shots
        };
    }

    render() {
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Round</th>
                        <th>Field</th>
                        <th>Quantifier</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.shots.map((shot, i) => {
                        const round = Math.floor(i / 3 + 1);
                        const field = shot.points / shot.quantifier;
                        const rowType = (i % 6 >= 3) ? "table-primary":"table-sucess";
                        return (
                            <tr className={rowType} key={i}>
                                <th>{round}</th>
                                <th>{field}</th>
                                <th>{shot.quantifier}</th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        );
    }
}

export default DisplayResults;
