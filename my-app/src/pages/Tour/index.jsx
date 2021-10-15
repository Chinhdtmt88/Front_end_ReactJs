import Button from "@restart/ui/esm/Button";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
function Tour(props) {
  console.log("den day chưa");
  const history = useHistory();

  return (
    <>
      <Header />
      <div>
        <h1>this is page Tour</h1>
      </div>
      <Footer />
    </>
  );
}

export default Tour;
