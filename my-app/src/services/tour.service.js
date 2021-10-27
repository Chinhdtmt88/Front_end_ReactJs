import axiosClient from "../api/axiosClient";

const tourApi = {
  getAll: (params) => {
    const url = "/tours";
    return axiosClient.get(url, { params });
  },

  getTour: (tourId) => {
    const url = `/tours/${tourId}`;
    return axiosClient.get(url);
  },
};
export default tourApi;
