/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Icon, Menu } from "antd";
import { useHistory } from "react-router-dom";

export default function Header() {
  let history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handlelogout = () => {
    localStorage.clear();
    setIsLogin(false);
    history.push("/");
  };

  return (
    <div className="header">
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
        {isLogin ? (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link to="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <Button className="btn btn-light" onClick={handlelogout}>
              Logout
            </Button>
            <Link to="/me" className="nav__el">
              <img className="nav__user-img" />
              {/* <span>${user.name}</span> */}
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
