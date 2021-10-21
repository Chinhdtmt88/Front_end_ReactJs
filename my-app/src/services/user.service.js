import axiosClient from "../api/axiosClient";
import authHeader from "./auth-header";

const getPublicContent = () => {
  const url = "/tours";
  return axiosClient.get(url, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
};
