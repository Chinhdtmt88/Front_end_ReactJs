import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not valid email
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 character
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vpasswordConfirm = (value, props, comp) => {
  console.log(value, comp);
  //   eslint-disable-next-line eqeqeq
  if (value != comp.password[0].value) {
    return (
      <div className="alert alert-danger" role="alert">
        Passwords don't match
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangename = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmpassword = (e) => {
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name, email, password, passwordConfirm))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="login-form">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />

      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="form-group">
              <label className="form__label">Username</label>
              <Input
                type="text"
                className="form__input"
                name="username"
                value={name}
                onChange={onChangename}
                validations={[required, vname]}
              />
            </div>
            <div className="form-group">
              <label className="form__label">Email</label>
              <Input
                type="text"
                className="form__input"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className="form-group">
              <label className="form__label">Password</label>
              <Input
                type="password"
                className="form__input"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <label className="form__label">ConfirmPassword</label>
              <Input
                type="password"
                className="form__input"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangeConfirmpassword}
                validations={[required, vpassword, vpasswordConfirm]}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};
export default Register;
