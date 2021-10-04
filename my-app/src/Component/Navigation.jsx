import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className="header">
        <nav className="nav nav--tours">
          <a className="nav__el" href="/">
            All tours
          </a>
          <from className="nav_search">
            <button className="nav__search-btn">
              <svg>
                <use xlinkHref="/icons.svg#icon-search"></use>
              </svg>
            </button>
            <div className="nav__search-input">
              <input type="text" placeholder="Search tours" />
            </div>
          </from>
        </nav>
        <div className="header__logo">
          <img src="../logo-white.png" alt="Natours logo" />
        </div>
        <nav className="nav nav--user">
          <a className="nav__el" href="/login">
            Log in
          </a>
          <a className="nav__el nav__el--cta" href="/#">
            Sign up
          </a>
        </nav>
      </header>
    );
  }
}

export default Navigation;
