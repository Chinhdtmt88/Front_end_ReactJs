import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import tourActions from "../actions/tours";

const Home = () => {
  const [listTour, setListtour] = useState([]);
  const dispatch = useDispatch();
  // const listTour = useSelector((state) => state.tour.tours);
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        console.log("xong roi moi chay vao day");
        dispatch(tourActions.SetAllTour(response.data.data));
        setListtour(response.data.data);
      },
      () => dispatch(tourActions.SetAllTour([]))
    );
    console.log("chạy vao day truoc");
  }, [dispatch]);
  return (
    <div className="card-container ">
      {listTour.map((item, i) => {
        return (
          <div key={i} className="card">
            <div className="card__header">
              <div className="card__picture">
                <div className="card__picture-overlay">&nbsp;</div>
                <img
                  src={`../tours/${item.imageCover}`}
                  alt={`${item.name}`}
                  className="card__picture-img"
                />
              </div>

              <h3 className="heading-tertirary">
                <span>{item.name}</span>
              </h3>
            </div>

            <div className="card__details">
              <h4 className="card__sub-heading">{`${item.difficulty} ${item.duration}-day tour`}</h4>
              <p className="card__text">{item.summary}</p>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-map-pin"></use>
                </svg>
                <span>{item.startLocation.description}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-calendar"></use>
                </svg>
                <span>
                  {moment(item.startDates[0]).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-flag"></use>
                </svg>
                <span>{`${item.locations.length} stops`}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-user"></use>
                </svg>
                <span>{`${item.maxGroupSize} people `}</span>
              </div>
            </div>

            <div className="card__footer">
              <p>
                <span className="card__footer-value">{`$${item.price}`}</span>

                <span className="card__footer-text">per person</span>
              </p>
              <p className="card__ratings">
                <span className="card__footer-value">
                  {item.ratingsAverage}
                </span>
                <span className="card__footer-text">{`rating (${item.ratingsQuantity})`}</span>
              </p>
              <Link
                to={`/tour/${item.slug}/${item.id}`}
                className="btn btn--green btn--small"
              >
                Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
