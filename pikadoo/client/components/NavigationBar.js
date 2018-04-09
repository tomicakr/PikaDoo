import React from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/"><a className="navbar-brand" href="#">Pikadoo</a></Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="#">Single-player</a></li>
                        <li><a href="#">Multi-player</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/signup"><a><span className="glyphicon glyphicon-user"></span> Sign Up</a></Link></li>
                        <li><Link to="/login"><a><span className="glyphicon glyphicon-log-in"></span> Login</a></Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;