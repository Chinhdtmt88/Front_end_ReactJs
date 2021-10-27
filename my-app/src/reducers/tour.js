import { SAVE_TOURS } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? { tours: [] } : {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_TOURS:
      console.log("dispacth vao day", action);
      return {
        ...state,
        tours: payload,
      };
    default:
      return state;
  }
}
