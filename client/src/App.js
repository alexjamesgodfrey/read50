import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.js';
import SearchPage from './SearchPage.js';
import Profile from './components/Profile/Profile.js';
import Clubs from './Clubs.js';
import Leaderboard from './Leaderboard.js';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inDB: false,
      color: "#eb3b3b"
    }
  }
  
  //sleep function
  sleep = ms => new Promise(res => setTimeout(res, ms));

  addToDB = async (sub, email, username, picture, logcount) => {
    try {
      const auth0User = `
      {"auth0_id": "${sub}",
      "email": "${email}",
      "username": "${username}",
      "picture_link": "${picture}",
      "logincount": "${logcount}",
      "color": "#ba7373"}`
      
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: auth0User
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  //function sets this.state.inDB to true, if user is in postgresDB, else adds and sets to true
  //params: user's auth0 id
  checkIfDB = async (sub, email, username, picture, logcount) => {
    //responseText = valid user if user is in database
    const response = await fetch(`/api/users/herecheck/${sub}`);
    const responseText = await response.text();
    await this.sleep(100);
    if (responseText !== 'valid user') {
      //add to database function and set inDB to true
      this.addToDB(sub, email, username, picture, logcount);
    } else {
      //set inDB to true
      this.state.inDB = true;
    }
  };


  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} exact />
          <Route path="/search" component={(props) => <SearchPage {...props} sleep={this.sleep} addToDB={this.addToDB} checkIfDB={this.checkIfDB} />} />
          <Route path="/profile" component={(props) => <Profile {...props} state={this.state} sleep={this.sleep} />} />
          <Route path="/clubs" component={(props) => <Clubs {...props} sleep={this.sleep} />} />
          <Route path="/leaderboard" component={(props) => <Leaderboard {...props} sleep={this.sleep} />} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
