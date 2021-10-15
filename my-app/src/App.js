import React, { Suspense } from "react";
import { Redirect } from "react-router";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/SignUp"));
const Overview = React.lazy(() => import("./pages/Alltour"));
const Tour = React.lazy(() => import("./pages/Tour"));
const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route
            path="/tour/:slug"
            render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              // eslint-disable-next-line no-undef
              return window.localStorage.getItem("token") ? (
                <Tour />
              ) : (
                <Redirect to="/Login" />
              );
            }}
          ></Route>
          <Route path="/me">
            <Profile />
          </Route>
          <Route exact path="/">
            <Overview />
          </Route>
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
