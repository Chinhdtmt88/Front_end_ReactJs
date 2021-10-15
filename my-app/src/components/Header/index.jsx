import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Button from "@restart/ui/esm/Button";
import { useHistory } from "react-router-dom";

export default function Header() {
  const isLogin = localStorage.getItem("token");
  let history = useHistory();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);
  const logout = () => {
    localStorage.removeItem("token");
    alert("Logout success");
    history.push("/");
  };

  useEffect(() => {
    const loadDataProfile = async () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        let user = JSON.parse(userStr);
        setData(user);
      }
    };

    loadDataProfile();
  }, []);
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
        {isLogin != null ? (
          <div>
            <Button className="btn btn-light" onClick={logout}>
              Logout
            </Button>
            <Link to="/me" className="nav__el nav__el--cta">
              <img className="nav__user-img" src={`../users/${data.photo}`} />
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link to="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
