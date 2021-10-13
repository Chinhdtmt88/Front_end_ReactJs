import axiosClient from "./axiosClient";

const tourApi = {
  getAll: (params) => {
    const url = "/tours";
    return axiosClient.get(url, { params });
  },
};

export default tourApi;
