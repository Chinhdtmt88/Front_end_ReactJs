import React, { useState } from "react";
import axios from "axios";
//import { setUserSession } from './Utils/Common';

function Login(props) {
  const [state, setState] = useState({
    data: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const email = useFormInput("");
  const password = useFormInput("");
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://127.0.0.1:3000/api/v1/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        console.log(response.data.data.user);
        setState({ data: response.data.data.user });
        //setUserSession(response.data.token, response.data.user);
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Somethins went wrong. Please try again later");
      });
  };

  return (
    <div>
      Login
      <br />
      <br />
      <div>
        Email
        <br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
