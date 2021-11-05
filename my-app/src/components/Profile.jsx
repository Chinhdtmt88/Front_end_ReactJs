/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react";
import authService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";

import { showAlert } from "../ultil/alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import userApi from "../api/userApi";
import userAction from "../actions/users";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required
      </div>
    );
  }
};
const Profile = () => {
  const settings = [
    {
      path: "/#",
      icon: "settings",
      text: "Settings",
      active: "active",
    },
    {
      path: "/#",
      icon: "briefcase",
      text: "My Bookings",
    },
    {
      path: "/#",
      icon: "star",
      text: "My Reviews",
    },
    {
      path: "/#",
      icon: "credit-card",
      text: "Billing",
    },
  ];

  const Admin = [
    {
      path: "/#",
      icon: "map",
      text: "Manage Tours",
    },
    {
      path: "/#",
      icon: "users",
      text: "Manage Users",
    },
    {
      path: "/#",
      icon: "star",
      text: "Manage Reviews",
    },
    {
      path: "/#",
      icon: "briefcase",
      text: "Manage Booking",
    },
  ];
  let user = JSON.parse(localStorage.getItem("user"));

  // const dispatch = useDispatch();
  // const [myProfile, setMyProfile] = useState({});

  // useEffect(() => {
  //   // Todo: Call api0
  //   const ProfileMe = async () => {
  //     try {
  //       const response = await userApi.getMe();
  //       setMyProfile(response.data.data);
  //       console.log(response.data.data);
  //     } catch (error) {
  //       console.log("Fail to featch tour", error);
  //     }
  //   };
  //   ProfileMe();
  // }, []);

  const routeProfile = settings.map(({ path, icon, text, active }, i) => (
    <>
      <li key={i} className={`${active ? "side-nav--active" : ""}`}>
        <a href={path}>
          <svg>
            <use xlinkHref={`../icons.svg#icon-${icon}`}></use>
          </svg>
          {text}
        </a>
      </li>
    </>
  ));

  const routeAdmin = Admin.map(({ path, icon, text, active }, i) => (
    <>
      <li key={i} className={`${active ? "side-nav--active" : ""}`}>
        <a href={path}>
          <svg>
            <use xlinkHref={`../icons.svg#icon-${icon}`}></use>
          </svg>
          {text}
        </a>
      </li>
    </>
  ));

  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(user.photo);
  const [password, setPassword] = useState();
  const [newpassword, setNewpassword] = useState(user.email);
  const [confirmPass, setConfirmPass] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhoto = (e) => {
    const photo = e.target.files[0];
    console.log(e.target.files[0]);
    setPhoto(photo);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (checkBtn.current.context._errors.length === 0) {
      const data = { name, email, photo };
      //call api

      const response = await userApi.updateMe(data);
      console.log(response);
      if (response.status === "success") {
        showAlert(
          "success",
          `${response.data.user.name} update in successfully!`
        );
        // dispatch(userAction.UpdateProfile(response.data));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.reload();
        console.log(response.data.user.name);
      }
    } else {
      showAlert("no success");
      setLoading(false);
    }
  };

  const Password = (e) => {
    setPassword(e.target.value);
  };

  const newPassword = (e) => {
    setNewpassword(e.target.value);
  };
  const ConfirmNewPassword = (e) => {
    setConfirmPass(e.target.value);
  };

  return (
    <>
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">{routeProfile}</ul>

          {user.role === "admin" ? (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">{routeAdmin}</ul>
            </div>
          ) : (
            ""
          )}
        </nav>

        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>

            <Form
              className="form form-user-data"
              onSubmit={handleUpdate}
              ref={form}
            >
              <div className="form-group">
                <label className="form__label">Name</label>
                <Input
                  type="text"
                  className="form__input"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>

              <div className="form-group ma-bt-md">
                <label className="form__label">Email address</label>
                <Input
                  type="email"
                  className="form__input"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
                />
              </div>

              <div className="form__group form__photo-upload">
                <img
                  src={`../users/${user.photo}`}
                  className="form__user-photo"
                  alt="Photo user"
                />
                <Input
                  type="file"
                  className="form__upload"
                  name="photo"
                  id="photo"
                  onChange={onChangePhoto}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form-group right">
                <button
                  className="btn btn--small btn--green"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Save Settings</span>
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
          <div className="user-view__content">
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">Password changed</h2>

              <Form
                className="form form-user-data"
                // onSubmit={handleChangePass}
                ref={form}
              >
                <div className="form-group">
                  <label className="form__label">Current password</label>
                  <Input
                    type="password"
                    className="form__input"
                    name="password"
                    value={password}
                    onChange={Password}
                    validations={[required]}
                  />
                </div>

                <div className="form-group ma-bt-md">
                  <label className="form__label">New Password</label>
                  <Input
                    type="password"
                    className="form__input"
                    name="password"
                    value={newpassword}
                    onChange={newPassword}
                    validations={[required]}
                  />
                </div>

                <div className="form-group ma-bt-md">
                  <label className="form__label">Confirm New Password</label>
                  <Input
                    type="password"
                    className="form__input"
                    name="email"
                    value={confirmPass}
                    onChange={ConfirmNewPassword}
                    validations={[required]}
                  />
                </div>
                <div className="form-group right">
                  <button
                    className="btn btn--small btn--green"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Save Password</span>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
