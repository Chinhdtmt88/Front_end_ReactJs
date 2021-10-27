import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import tourApi from "../api/tourApi";

function Tour(props) {
  console.log("den day chưa");
  const { tours } = useSelector((state) => state.tour);
  const { slug, tourId } = useParams();
  const [tour, setTour] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Todo: Call api0
    const getTour = async () => {
      try {
        const response = await tourApi.getTour(tourId);
        console.log(response);
        setTour(response.data.data);
      } catch (error) {
        console.log("Fail to featch tour", error);
      }
    };
    getTour();
  }, [tours, tourId]);
  console.log(slug, tourId);
  return (
    <>
      <div>
        <h1>this is page Tour</h1>

        {tourId ? <pre>{JSON.stringify(tour)}</pre> : "Không có tour nào"}
      </div>
    </>
  );
}

export default Tour;
