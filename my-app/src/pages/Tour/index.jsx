import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Tour(props) {
  console.log("den day chưa");
  const { tours } = useSelector((state) => state.user);
  const { slug, tourId } = useParams();
  const [tour, setTour] = useState({});
  useEffect(() => {
    if (tourId) {
      // Todo: Call api0
    }
  }, [tours, tourId]);
  console.log(slug, tourId, tours);
  return (
    <>
      <div>
        <h1>this is page Tour</h1>
        {tour.id ? <pre>{JSON.stringify(tour)}</pre> : "Không có tour nào"}
      </div>
    </>
  );
}

export default Tour;
