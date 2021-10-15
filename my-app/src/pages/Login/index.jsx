import React, { useState, useRouter } from "react";
import { Form, Button } from "react-bootstrap";
import { showAlert } from "../../utils/alert";
import { useHistory } from "react-router";
import userApi from "../../api/userApi";
import axiosClient from "../../api/axiosClient";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function onLogin(e) {
    e.preventDefault();
    try {
      const url = "/users/login";
      const res = await axiosClient
        .post(url, {
          email: email,
          password: password,
        })
        .then((res) => {
          // console.log(response.data.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          if (res.status === "success") {
            showAlert("success", "Logged in successfully");
            history.push("/");
          }
        });
    } catch (error) {
      showAlert("error", error.res.data.message);
    }
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <Form className="form form--login" action={null}>
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
            <Button className="btn btn--green btn-sm" onClick={onLogin}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default Login;
