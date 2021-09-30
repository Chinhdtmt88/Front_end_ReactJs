import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Component/Navigation";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Overview from "./Component/Overview";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Navigation />
          <Switch>
            <Route path="/" component={Overview} />
            <Route path="/login" />
            <Route path="/signup" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
