import { SAVE_TOURS, SET_MESSAGE } from "./types";

const tourActions = {
  SetAllTour: (payload) => ({
    type: SAVE_TOURS,
    payload,
  }),
};
export default tourActions;
