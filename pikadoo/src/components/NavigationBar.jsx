import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class NavigationBar extends React.Component {

    render() {
        const { user, loggedIn } = this.props;

        return (
            <nav className="navbar navbar-static-top navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Pikadoo</Link>
                    </div>
                    {
                        loggedIn &&
                        <div>
                            <ul className="nav navbar-nav">
                                <li><Link to="/singleplayer"><span className="text-white">Single-player</span></Link></li>
                            </ul>
                            <ul className="nav navbar-nav">
                                <li><Link to="/multiplayer"><span className="text-white">Multi-player</span></Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/login"><span className="glyphicon glyphicon-log-out" href="/login"></span> Logout</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/profile"><span className="text-white">Hello, {user.username}!</span></Link></li>
                            </ul>
                        </div>
                    }
                    {
                        !loggedIn &&
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/register"><span className="glyphicon glyphicon-user" href="/register"></span> Register</Link></li>
                            <li><Link to="/login"><span className="glyphicon glyphicon-log-in" href="/login"></span> Login</Link></li>
                        </ul>
                    }
                </div>
            </nav>
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

const connectedNavigationBar = connect(mapStateToProps)(NavigationBar);
export { connectedNavigationBar as NavigationBar };
