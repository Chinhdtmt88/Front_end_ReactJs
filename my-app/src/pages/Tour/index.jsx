import React from "react";

import { useHistory } from "react-router-dom";

function Tour(props) {
  console.log("den day chưa");
  const history = useHistory();

  return (
    <>
      <div>
        <h1>this is page Tour</h1>
      </div>
    </>
  );
}

export default Tour;
