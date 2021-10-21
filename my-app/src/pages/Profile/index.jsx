import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import userApi from "../../api/userApi";

function Profile(props) {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  // let history = useHistory();
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [data, setData] = useState([]);
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   alert("Logout success");
  //   history.push("/");
  // };

  // useEffect(() => {
  //   const loadDataProfile = async () => {
  //     const userStr = localStorage.getItem("user");
  //     if (userStr) {
  //       let user = JSON.parse(userStr);
  //       setData(user);
  //     }
  //   };

  //   loadDataProfile();
  // }, []);

  return (
    <>
      <div>
        <h1>this is page profile me</h1>
        <h2>Name:{user.name}</h2>
        <h1>Role:{user.role}</h1>
      </div>
    </>
  );
}

export default Profile;
