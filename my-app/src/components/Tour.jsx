/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "mapbox-gl";
import ReactMapGL, { Marker } from "react-map-gl";
import tourApi from "../services/tour.service";

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoiY2hpbmhudjQ2IiwiYSI6ImNrdDhibW1kazEwbnMydmxqZTN0NTNwYjgifQ.LegkQHZ53fkU8hcpa-Py2w";

function Tour(props) {
  console.log("den day chưa");
  const { tours } = useSelector((state) => state.tour);
  const { slug, tourId } = useParams();
  const [tour, setTour] = useState({
    guides: [],
    startDates: [],
    images: [],
    locations: [],
    description: "",
  });

  const [viewport, setViewport] = useState({
    latitude: 21.028511,
    longitude: 105.804817,
    zoom: 9,
  });

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

  const Quick = [
    {
      icon: "calendar",
      label: "NEXT DAY",
      text: `${moment(tour.startDates[0]).format("DD/MM/YYYY")}`,
    },
    {
      icon: "trending-up",
      label: "DIFFICULTY",
      text: `${tour.difficulty}`,
    },
    {
      icon: "user",
      label: "PARTICIPAINTS",
      text: `${tour.maxGroupSize}`,
    },
    {
      icon: "star",
      label: "RATING",
      text: `${tour.ratingsAverage}`,
    },
  ];

  const listQuick = Quick.map(({ icon, label, text }, i) => (
    <>
      <li key={i} className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
        </svg>
        <span className="overview-box__label">{label}</span>
        <span className="overview-box__text">{text}</span>
      </li>
    </>
  ));

  const guides = tour.guides.map((guide, i) => (
    <div key={i} className="overview-box__detail">
      <img
        className="overview-box__img"
        src={`/users/${guide.photo}`}
        alt={guide.name}
      ></img>
      {guide.role === "lead-guide" ? (
        <span className="overview-box__label">Lead guide</span>
      ) : (
        <span className="overview-box__label">Tour guide</span>
      )}
      <span className="overview-box__text">{guide.name}</span>
    </div>
  ));

  const parapraphs = tour.description.split("\n");
  const p = parapraphs.map((para, i) => (
    <p key={i} className="description__text">
      {para}
    </p>
  ));

  const Img = tour.images.map((img, i) => (
    <div className="picture-box">
      <img
        className="picture-box__img"
        src={`/tours/${img}`}
        alt={`The Park Camper Tour ${i}`}
      />
    </div>
  ));

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      <section className="section-header">
        <>
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{tour.duration} DAYS</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">{tour.name} DAYS</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <div> {listQuick}</div>
            </div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guide</h2>
              <div>{guides}</div>
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            {`About ${tour.name} tour`}{" "}
          </h2>
          <span className="description__text">{p}</span>
        </div>
      </section>

      <section className="section-pictures">
        <div>{Img}</div>
      </section>

      <section>
        <div>
          <ReactMapGL
            {...viewport}
            height="600px"
            width="auto"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onViewportChange={setViewport}
            mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          >
            {tour.locations.map((point) => (
              <Marker
                key={tour.locations._id}
                latitude={point.coordinates[1]}
                longitude={point.coordinates[0]}
              >
                <button className="marker-btn">
                  <img src="/Map_pin_icon_green.svg.png" alt="GHTK Icon" />
                </button>
              </Marker>
            ))}
          </ReactMapGL>
        </div>
      </section>
    </>
  );
}

export default Tour;
