import { UPDATE_SUCCESS } from "./types";

const userAction = {
  UpdateProfile: (payload) => ({
    type: UPDATE_SUCCESS,
    payload,
  }),
};
export default userAction;
