import React, { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
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
        <Link to="/login" className="nav__el">
          Log in
        </Link>
        <Link to="/signup" className="nav__el nav__el--cta">
          Sign up
        </Link>
      </nav>
    </header>
  );
}
