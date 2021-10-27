import { UPDATE_SUCCESS, UPDATE_FAIL, SET_MESSAGE } from "./types";

import userService from "../services/user.service";

export const updatesetting = (name, email, photo) => (dispatch) => {
  return userService.updateSettings(name, email, photo).then(
    (data) => {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: { data },
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
        type: UPDATE_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
