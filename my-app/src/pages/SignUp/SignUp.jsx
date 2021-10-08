import { useState } from "react";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordconfirm] = useState("");
  const [name, setName] = useState("");
  let errorsObj = { email: "", password: "", passwordConfirm: "" };
  const [errors, setErrors] = useState(errorsObj);

  function onSignUp(e) {
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

    if (passwordConfirm === "") {
      errorObj.passwordConfirm = "Passwordconfirm is required";
      error = true;
    }
    setErrors(errorObj);

    if (!error) {
      console.log("form submit");
    }
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">SignUp Account</h2>
        <form className="form form--login" onSubmit={onSignUp}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <div>
              <input
                className="form__input"
                type="email"
                placeholder="you@example.com"
                required="required"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            {errors.email && <div>{errors.email}</div>}
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <div>
              <input
                className="form__input"
                type="password"
                placeholder="••••••••"
                required="required"
                minLength="8"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            {errors.password && <div>{errors.password}</div>}
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Confirm Password
            </label>
            <div>
              <input
                className="form__input"
                type="password"
                placeholder="••••••••"
                required="required"
                minLength="8"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordconfirm(e.target.value);
                }}
              />
            </div>
            {errors.passwordConfirm && <div>{errors.passwordConfirm}</div>}
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              type="name"
              placeholder="name"
              required="required"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
