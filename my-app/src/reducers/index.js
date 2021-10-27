import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import tour from "./tour";
export default combineReducers({
  auth,
  user,
  message,
  tour,
});
