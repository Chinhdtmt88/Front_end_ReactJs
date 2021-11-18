import userApi from "../api/userApi";
import _ from "lodash";
import { GET_ALL_USER, GET_ALL_USER_FAIL, SET_MESSAGE } from "./types";

const getAllUser = () => async (dispatch) => {
  try {
    const response = await userApi.manageuser();
    dispatch({
      type: GET_ALL_USER,
      payload: { alluser: response.data.data },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.status,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_USER_FAIL,
    });
  }
};

export const AllUser = {
  getAllUser,
};
