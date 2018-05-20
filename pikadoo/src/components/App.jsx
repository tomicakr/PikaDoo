import React, { PureComponent } from 'react';

import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { PrivateRoute } from './PrivateRoute'

import Favicon from 'react-favicon';
import { NavigationBar } from './NavigationBar';
import SinglePlayer from './SinglePlayer';
import MultiPlayer from './MultiPlayer';
import {HomePage} from './HomePage';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;

        return (
            <Router history={history}>
                <div>
                    <div>
                        <Favicon url="data:image/png;base64,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" />
                        <Route path="/" component={NavigationBar} />
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <PrivateRoute exact path="/singleplayer" component={SinglePlayer} />
                        <PrivateRoute exact path="/multiplayer" component={MultiPlayer} />
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
