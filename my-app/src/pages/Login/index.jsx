import React, { useState, useRouter } from "react";
import authlogin from "../../services/AuthService";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onLogin(e) {
    e.preventDefault();
    authlogin();
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login">
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" onClick={onLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
