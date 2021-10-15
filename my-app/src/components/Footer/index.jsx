import React, { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        {" "}
        <img src="../logo-green.png" alt="Natour logo" />
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
        &copy; by ChinhIoT. with from IoT Team GHTK !{" "}
      </p>
    </footer>
  );
}