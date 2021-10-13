import axiosClient from "./axiosClient";

const userApi = {
  postuser: () => {
    const url = "/login";
    return axiosClient.post(url);
  },
};

export default userApi;
