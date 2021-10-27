/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef } from "react";
import authService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";

import { showAlert } from "../ultil/alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import userApi from "../api/userApi";

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

  const dispatch = useDispatch();
  const currentData = authService.getCurrentUser();
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
  const [name, setName] = useState(currentData.name);
  const [email, setEmail] = useState(currentData.email);
  const [photo, setPhoto] = useState(currentData.photo);
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
    setPhoto(photo);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (checkBtn.current.context._errors.length === 0) {
      const data = { name, email, photo, setting_id: currentData._id };
      //call api
      const response = await userApi.updateSetting(data);
      setLoading(true);
      if (response && response.data && response.data.success) {
        showAlert("success");
        window.location.reload();
      }
    } else {
      showAlert("no success");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">{routeProfile}</ul>

          {currentData.role === "admin" ? (
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
            <h2 className="heading-secondary.ma-bt-md">
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
                  src={`../users/${currentData.photo}`}
                  className="form__user-photo"
                  alt="Photo user"
                />
                <input
                  type="file"
                  className="form__upload"
                  accept="image/*"
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
        </div>
      </div>
    </>

    // <div className="container">
    //   <header className="jumbotron">
    //     <h3>
    //       <strong>{currentData.name}</strong> Profile
    //     </h3>
    //   </header>
    //   {/* <p>
    //     <strong>Token:</strong> {currentData.token.substring(0, 20)} ...{" "}
    //     {currentData.token.substr(currentData.token.length - 20)}
    //   </p> */}
    //   <p>
    //     <strong>Id:</strong> {currentData._id}
    //   </p>
    //   <p>
    //     <strong>Email:</strong> {currentData.email}
    //   </p>
    //   <strong>Authorities:</strong>
    //   {currentData.role}
    //   {/* <ul>
    //     {currentData.data.user.role &&
    //       currentData.data.user.role.map((role, index) => (
    //         <li key={index}>{role}</li>
    //       ))}
    //   </ul> */}
    // </div>
  );
};

export default Profile;
