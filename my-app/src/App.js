/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { Redirect } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
// import Manage_user from "./components/Manage_user";
const Home = React.lazy(() => import("../src/components/Home"));
const Login = React.lazy(() => import("../src/components/Login"));
const Register = React.lazy(() => import("../src/components/Register"));
const Profile = React.lazy(() => import("../src/components/Profile"));
const Tour = React.lazy(() => import("../src/components/Tour"));
const ManageUser = React.lazy(() => import("../src/pages/Manage_user/index"));
// const ManageUser = React.lazy(() => import("../src/components/Manage_user"));
const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              <div className="header__logo">
                <img src="/logo-green.png" alt="Natours logo" />
              </div>
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav__el">
                  Home
                </Link>
              </li>
              <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {/* {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav__el">
                    User
                  </Link>
                </li>
              )} */}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav__el">
                    {/* <img
                      className="nav__user-img"
                      src={`../users/${currentUser.photo}`}
                      alt={`Photo of ${currentUser.name}`}
                    /> */}
                    {currentUser.name}
                  </Link>
                </li>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <li className="nav-item">
                  <Link to="/login" className="nav__el" onClick={logOut}>
                    LogOut
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav__el">
                    Login
                  </Link>
                </li>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <li className="nav-item">
                  <Link to={"/register"} className="nav__el">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="main">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route
                path="/tour/:slug/:tourId"
                render={() => {
                  return window.localStorage.getItem("token") ? (
                    <Tour />
                  ) : (
                    <Redirect to="/Login" />
                  );
                }}
              ></Route>

              <Route path="/manage_user" component={ManageUser} />
            </Switch>
          </div>
          <footer className="footer navbar-dark bg-dark">
            <div className="footer__logo">
              {" "}
              <img src="/logo-green.png" alt="Natour logo" />
            </div>
            <ul className="footer__nav">
              <li>
                <Link to="/#">About us</Link>
              </li>
              <li>
                <Link to="/#">Download apps</Link>
              </li>
              <li>
                <Link to="/#">Become a guide </Link>
              </li>
              <li>
                <Link to="/#">Careers</Link>
              </li>
              <li>
                <Link to="/#">Contact</Link>
              </li>
            </ul>
            <p className="footer__copyright">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &copy; by ChinhIoT. with
              from IoT Team GHTK !{" "}
            </p>
          </footer>
        </div>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
