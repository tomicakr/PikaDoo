// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    render() {
       const {component: Component, ...rest} = this.props;
       const { user, loggedIn } = this.props
       return (
         <Route {...rest} render={props => (
             loggedIn
                 ? <Component {...props} />
                 : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
         )} />
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

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export { connectedPrivateRoute as PrivateRoute };
