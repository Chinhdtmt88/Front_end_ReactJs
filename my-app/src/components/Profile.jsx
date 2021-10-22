import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
// import Settings from "../components/Settings";
// import MyBookings from "../components/MyBookings";
// import MyReviews from "../components/MyReviews";
// import Billing from "../components/Billing";

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
  return (
    <div className="user-view">
      <nav className="user-view__menu">
        <ul className="side-nav">{routeProfile}</ul>

        {currentData.role === "admin" ? (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <li className="side-nav">
                <Link to="/#">
                  <svg>
                    <use xlinkHref="../icons.svg#icon-map"></use>"
                  </svg>
                  Manage tours
                </Link>
              </li>

              <li className="side-nav">
                <h3>
                  <Link to="/#">
                    <svg>
                      <use xlinkHref="../icons.svg#icon-users"></use>"
                    </svg>
                    Manage users
                  </Link>
                </h3>
              </li>

              <li className="side-nav">
                <h3>
                  <Link to="/#">
                    <svg>
                      <use xlinkHref="../icons.svg#icon-star"></use>"
                    </svg>
                    Manage reviews
                  </Link>
                </h3>
              </li>

              <li className="side-nav">
                <h3>
                  <Link to="/#">
                    <svg>
                      <use xlinkHref="../icons.svg#icon-briefcase"></use>"
                    </svg>
                    Manage booking
                  </Link>
                </h3>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </nav>

      <div className="user-view__content">
        <div className="user-view__from-container">
          <h2 className="heading-secondary.ma-bt-md">Your account settings</h2>

          <form className="form form-user-data">
            <div className="form__group">
              <label className="form__label">Name</label>
              {/* <Input id= */}
            </div>
          </form>
        </div>
      </div>
    </div>

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
