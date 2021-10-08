import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { loginAction } from "../../store/actions/AuthActions";
//import { setUserSession } from './Utils/Common';

function Login(props) {
  const [state, setState] = useState({
    data: {},
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let errorsObj = { email: "", password: "", passwordConfirm: "" };
  const [errors, setErrors] = useState(errorsObj);

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }

    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);

    if (!error) {
      console.log("form submit");
    }

    dispatch(loginAction(email, password));
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

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
  };
};

export default connect(mapStateToProps)(Login);
