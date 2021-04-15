import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.js';
import SearchPage from './components/Search/SearchPage.js';
import Profile from './components/ProfileUser/Profile.js';
import User from './components/ProfileUser/User.js';
import Clubs from './components/Clubs/Clubs.js';
import Leaderboard from './components/Leaderboards/Leaderboard.js';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  
  //sleep function
  sleep = ms => new Promise(res => setTimeout(res, ms));

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} exact />
          <Route path="/search/:urlSearch?" component={(props) => <SearchPage {...props} sleep={this.sleep} />} />
          <Route path="/profile" component={(props) => <Profile {...props} state={this.state} sleep={this.sleep} />} />
          <Route path="/user/:username" component={(props) => <User {...props} state={this.state} sleep={this.sleep} />} />
          <Route path="/clubs" component={(props) => <Clubs {...props} sleep={this.sleep} />} />
          <Route path="/leaderboard" component={(props) => <Leaderboard {...props} sleep={this.sleep} />} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
