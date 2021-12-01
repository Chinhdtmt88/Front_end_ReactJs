import axiosClient from "./axiosClient";

const tourApi = {
  getAll: () => {
    const url = "/tours";
    return axiosClient.get(url);
  },

  getTour: (tourId) => {
    const url = "/tours/" + tourId;
    return axiosClient.get(url);
  },
};
export default tourApi;
