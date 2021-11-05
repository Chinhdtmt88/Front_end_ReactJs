/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const Tour = React.lazy(() => import("../src/components/Tour"));

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
      <Router history={history}>
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
              {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )} */}

              {/* {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )} */}
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
                    <img
                      className="nav__user-img"
                      src={`/users/${currentUser.photo}`}
                      alt={`Photo of ${currentUser.name}`}
                    />
                    {currentUser.name}
                  </Link>
                </li>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <li className="nav-item">
                  <a href="/login" className="nav__el" onClick={logOut}>
                    LogOut
                  </a>
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

              {/* <Route path="/user" component={BoardUser} /> */}
              {/* <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} /> */}
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
      </Router>
    </React.Suspense>
  );
};

export default App;
