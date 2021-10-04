import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";

const CardList = (props) => {
  const renderlist = ({ datalist }) => {
    if (datalist) {
      return (
        <div className="main">
          <div className="card-container ">
            {datalist.map((item, i) => {
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
                        {moment(item.startDates[0]).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )}
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
                    <a
                      href={`/tour/${item.slug}`}
                      className="btn btn--green btn--small"
                    >
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
