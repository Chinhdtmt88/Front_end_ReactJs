import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tour from "./tour";
import user from "./user";
export default combineReducers({
  auth,
  message,
  tour,
  user,
});
