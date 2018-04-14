import React from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-inverse bg-dark">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Pikadoo</a>
                        </div>
                        <ul className="nav navbar-nav">
                        <li><a href="#"><span className="text-white">Single-player</span></a></li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li><a href="#"><span className="text-white">Multi-player</span></a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/signup"><span className="glyphicon glyphicon-user" href="/singup"></span> Sign Up</Link></li>
                            <li><Link to="/login"><span className="glyphicon glyphicon-log-in" href="/login"></span> Login</Link></li>
                        </ul>
                    </div>
            </nav>
        );
    }
}

export default NavigationBar;
