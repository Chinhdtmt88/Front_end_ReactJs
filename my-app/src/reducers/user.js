import { UPDATE_SUCCESS, UPDATE_FAIL } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}
