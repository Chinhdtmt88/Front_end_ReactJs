import axiosClient from "./axiosClient";

const userApi = {
  getuser: () => {
    const url = "/users/";
    return axiosClient.get(url);
  },
};

export default userApi;
