import React, { useState, useRouter } from "react";
import { Form, Button } from "react-bootstrap";
import { setUserSession } from "../../utils/Common";
import { showAlert } from "../../utils/alert";
import { useHistory } from "react-router";
import userApi from "../../api/Userapi";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  async function onLogin(e) {
    e.preventDefault();
    try {
      const response = await userApi
        .post({
          email: email,
          password: password,
        })

        .then((response) => {
          setLoading(false);
          // console.log(response.data.token);
          window.localStorage.setItem("token", response.data.token);
          setUserSession(response.data.token, response.data.user);
          if (response.data.status === "success") {
            showAlert("success", "Logged in successfully");
            window.setTimeout(() => {
              history.push("/");
            }, 200);
          }
        });
    } catch (error) {
      showAlert("error", error.response.data.message);
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
