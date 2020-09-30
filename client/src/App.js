import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/NavBar/navbar";
import Footer from "./components/Footer/footer";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      song: ""
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <Router>
        <Switch>
          <React.Fragment>
            <Navbar></Navbar>
            <Route exact path="/" component={Landing} />
            <Route
              path="/home"
              render={props => <Home {...props} spotifyApi={spotifyApi} />}
            />

            <Footer></Footer>
          </React.Fragment>
        </Switch>
      </Router>
    );
  }
}

// client: npm start, authorization_code: nodemon server.js
export default App;
