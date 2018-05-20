import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class HomePage extends React.Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                    Bok
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
