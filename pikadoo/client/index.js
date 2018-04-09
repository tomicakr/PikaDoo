import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'

render((
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route exact path="/" component={Greetings} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
    </div>
  </Router>
), document.getElementById('app'));