import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { ToggleButtonGroup } from "react-bootstrap";
import moment from "moment";

const CardList = (props) => {
  const renderlist = ({ datalist }) => {
    if (datalist) {
      return (
        <div className="main">
          <div className="card-container ">
            {datalist.map((item) => {
              return (
                <div class="card">
                  <div class="card__header">
                    <div class="card__picture">
                      <div class="card__picture-overlay">&nbsp;</div>
                      <img
                        src={`../tours/${item.imageCover}`}
                        alt={`${item.name}`}
                        className="card__picture-img"
                      />
                    </div>

                    <h3 class="heading-tertirary">
                      <span>{item.name}</span>
                    </h3>
                  </div>

                  <div class="card__details">
                    <h4 class="card__sub-heading">{`${item.difficulty} ${item.duration}-day tour`}</h4>
                    <p class="card__text">{item.summary}</p>
                    <div class="card__data">
                      <svg class="card__icon">
                        <use xlinkHref="img/icons.svg#icon-map-pin"></use>
                      </svg>
                      <span>{item.startLocation.description}</span>
                    </div>
                    <div class="card__data">
                      <svg class="card__icon">
                        <use xlinkHref="img/icons.svg#icon-calendar"></use>
                      </svg>
                      <span>
                        {moment(item.startDates[0]).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )}
                      </span>
                    </div>
                    <div class="card__data">
                      <svg class="card__icon">
                        <use xlinkHref="img/icons.svg#icon-flag"></use>
                      </svg>
                      <span>{`${item.locations.length} stops`}</span>
                    </div>
                    <div class="card__data">
                      <svg class="card__icon">
                        <use xlinkHref="img/icons.svg#icon-user"></use>
                      </svg>
                      <span>{`${item.maxGroupSize} people `}</span>
                    </div>
                  </div>

                  <div class="card__footer">
                    <p>
                      <span class="card__footer-value">{`$${item.price}`}</span>

                      <span class="card__footer-text">per person</span>
                    </p>
                    <p class="card__ratings">
                      <span class="card__footer-value">
                        {item.ratingsAverage}
                      </span>
                      <span class="card__footer-text">{`rating (${item.ratingsQuantity})`}</span>
                    </p>
                    <a href="#" class="btn btn--green btn--small">
                      Details
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return <div>{renderlist(props)}</div>;
};

export default CardList;
