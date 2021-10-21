import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { data: currentData } = useSelector((state) => state.auth);

  if (!currentData) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentData.data.user.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentData.token.substring(0, 20)} ...{" "}
        {currentData.token.substr(currentData.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentData.data.user.id}
      </p>
      <p>
        <strong>Email:</strong> {currentData.data.user.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentData.data.user.role &&
          currentData.data.user.role.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
      </ul>
    </div>
  );
};

export default Profile;
