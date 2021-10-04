import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Component/Login";
import Overview from "./Component/Overview";
import Signup from "./Component/Signup";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Overview} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
