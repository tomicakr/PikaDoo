import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavigationBar extends React.Component {


    render() {
        const { user } = this.props;
        return (
            <nav className="navbar fixed-top navbar-inverse bg-dark">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Pikadoo</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="#"><span className="text-white">{user == null ? "Not logged in" : user.username}</span></a></li>
                        </ul>

                        <ul className="nav navbar-nav">
                            <li><a href="/singleplayer"><span className="text-white">Single-player</span></a></li>
                        </ul>

                        <ul className="nav navbar-nav">
                            <li><a href="#"><span className="text-white">Multi-player</span></a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/register"><span className="glyphicon glyphicon-user" href="/register"></span> Sign Up</Link></li>
                            <li><Link to="/login"><span className="glyphicon glyphicon-log-in" href="/login"></span> Login</Link></li>
                        </ul>
                    </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}


export default connect(mapStateToProps)(NavigationBar);
