import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import axios from "axios";
import Navigation from "./Navigation";

function Overview() {
  //Hook
  const [state, setState] = useState({
    data: [],
  });

  useEffect(() => {
    async function Getdata() {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/v1/tours");
        console.log(response.data.data.data);
        setState({ data: response.data.data.data });
      } catch (e) {
        console.error(e);
      }
    }
    Getdata();
  }, []);

  return (
    <React.Fragment>
      <Navigation />
      <CardList datalist={state.data} />
    </React.Fragment>
  );
}

export default Overview;
