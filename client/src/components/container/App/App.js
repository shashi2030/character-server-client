import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../Login/Login';
import Register from '../Register/Register';
import AuthRoute from '../../presentation/AuthRoute/AuthRoute';
import Home from '../../container/Home/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <AuthRoute path="/home" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App;
