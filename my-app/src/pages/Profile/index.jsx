import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import userApi from "../../api/userApi";

const Header = React.lazy(() => import("../../components/Header"));

function Profile(props) {
  let history = useHistory();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);
  const logout = () => {
    localStorage.removeItem("token");
    alert("Logout success");
    history.push("/");
  };

  useEffect(() => {
    const loadDataProfile = async () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        let user = JSON.parse(userStr);
        setData(user);
      }
    };

    loadDataProfile();
  }, []);

  return (
    <>
      <Header />
      <div>
        <h1>this is page profile me</h1>
        <h2>Name:{data.name}</h2>
        <h1>Role:{data.role}</h1>
      </div>
    </>
  );
}

export default Profile;
