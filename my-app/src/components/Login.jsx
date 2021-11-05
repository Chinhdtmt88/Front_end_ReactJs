import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form">
      <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />

      <Form onSubmit={handleLogin} ref={form}>
        <div className="form-group">
          <label className="form__label">Email</label>
          <Input
            type="text"
            className="form__input"
            name="Email"
            value={email}
            onChange={onChangeEmail}
            validations={[required]}
          />
        </div>

        <div className="form-group ma-bt-md">
          <label className="form__label">Password</label>
          <Input
            type="password"
            className="form__input"
            name="password"
            value={password}
            placeholder="********"
            onChange={onChangePassword}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <button className="btn btn--green" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Login;
