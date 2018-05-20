import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class HomePage extends React.Component {

    render() {
        return (
            <div className="site-wrapper ">

                <div className="site-wrapper-inner">

                    <div className="cover-container ">

                        <div className="inner cover">
                            <h1 className="cover-heading ">Darts</h1>
                            <p className="lead">Darts is a sport in which small missiles/torpedoes/arrows/darts are thrown at a circular dartboard fixed to a wall. Though various boards and rules have been used in the past, the term "darts" usually now refers to a standardised game involving a specific board design and set of rules. </p>
                            <p className="lead">
                                As well as being a professional competitive game, darts is a traditional pub game, commonly played in Britain and Ireland, across the Commonwealth, the Netherlands, Belgium, Germany, the Scandinavian countries, the United States, and elsewhere.
                            </p>
                            <p className="lead">
                                <a href="/singleplayer" className="btn btn-lg btn-default">Play</a>
                            </p>
                        </div>

                        <div className="mastfoot">
                            <div className="inner">
                                <p>inspiracion</p>
                            </div>
                        </div>

                    </div>

                </div>

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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
