import Button from "@restart/ui/esm/Button";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
function Tour(props) {
  console.log("den day chưa");
  const history = useHistory();
  const logout = () => {
    window.localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <header className="header">
        <nav className="nav nav--tours">
          <Link to="/" className="nav__el">
            All tours
          </Link>
        </nav>
        <div className="header__logo">
          <img src="../logo-white.png" alt="Natours logo" />
        </div>
        <nav className="nav nav--user">
          <Button className="btn btn-light" onClick={logout}>
            Logout
          </Button>
          <Link to="/me" className="nav__el nav__el--cta">
            <img className="nav__user-img" src="" alt="Photo of Chinh IoT" />
          </Link>
        </nav>
      </header>
      <div>
        <h1>this is page Tour</h1>
      </div>
      <Footer />
    </>
  );
}

export default Tour;
