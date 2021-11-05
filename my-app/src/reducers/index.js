import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tour from "./tour";
export default combineReducers({
  auth,
  message,
  tour,
});
