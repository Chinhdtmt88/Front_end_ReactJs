import { GET_ALL_USER, GET_ALL_USER_FAIL } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? {} : {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USER:
      return {
        ...state,
        alluser: payload.alluser,
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        alluser: null,
      };
    default:
      return state;
  }
}
