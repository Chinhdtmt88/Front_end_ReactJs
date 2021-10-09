import React, { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function Footer() {
  return (
    <footer class="footer">
      <div class="footer__logo">
        {" "}
        <img src="../logo-green.png" alt="Natour logo" />
      </div>
      <ul class="footer__nav">
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
      <p class="footer__copyright">
        &copy; by ChinhIoT. with from IoT Team GHTK !{" "}
      </p>
    </footer>
  );
}
