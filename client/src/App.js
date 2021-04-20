import { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Signup from './components/Authentication/Signup.js';
import Login from './components/Authentication/Login.js';
import ForgotPassword from './components/Authentication/ForgotPassword.js';
import Settings from './components/Authentication/Settings.js';
import SearchPage from './components/Search/SearchPage.js';
import About from './components/About/About.js';
import Bugs from './components/Bugs/Bugs.js';
import Tutorial from './components/Tutorial/Tutorial.js';
import Profile from './components/ProfileUser/Profile.js';
import User from './components/ProfileUser/User.js';
import Clubs from './components/Clubs/Clubs.js';
import Leaderboard from './components/Leaderboards/Leaderboard.js';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './contexts/AuthContext.js';
import PrivateRoute from './PrivateRoute.js';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <AuthProvider>
          <Switch>
            <Route path="/" component={Home} exact />
              <Route path="/signup" component={Signup} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/forgot-password" component={ForgotPassword} exact />
              <PrivateRoute path="/settings" component={Settings} exact />
              <PrivateRoute path="/search/:urlSearch?" component={SearchPage} />
              <PrivateRoute path="/about" component={About} />
              <PrivateRoute path="/bugs" component={Bugs} />
              <PrivateRoute path="/tutorial" component={Tutorial} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/user/:username" component={User} />
              <PrivateRoute path="/clubs" component={Clubs} />
              <PrivateRoute path="/leaderboard" component={Leaderboard} />
            <Route component={Error} />
          </Switch>
        </AuthProvider>
      </HashRouter>
    );
  }
}

export default App;
