import { SAVE_TOURS, SET_MESSAGE } from "./types";

import tourApi from "../services/tour.service";

export const getAll = () => (dispatch) => {
  return tourApi.getAll().then(
    (response) => {
      dispatch({
        type: SAVE_TOURS,
        payload: response.data.data,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
