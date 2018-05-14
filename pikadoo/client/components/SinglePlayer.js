import React from 'react';
import Board from './Board';

class SinglePlayer extends React.Component {

    render() {

        return (
            <div className='container'>
                <Board />
                <div className="btn-group">
                  <button type="button" className="btn btn-default active">1</button>
                  <button type="button" className="btn btn-default">2</button>
                  <button type="button" className="btn btn-default">3</button>
                </div>
            </div>
        );
    }
}

export default SinglePlayer;
