import { showAlert } from "../ultil/alert";
import axiosClient from "../api/axiosClient";
import authHeader from "./auth-header";

const getPublicContent = () => {
  const url = "/tours";
  return axiosClient.get(url, { headers: authHeader() });
};

const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password" ? "users/updateMyPassword" : "users/updateMe";

    const response = await axiosClient.patch(url, { data });

    if (response.status === "success") {
      showAlert("success", `${type.toUpperCase()} update in successfully!`);
    }
  } catch (err) {
    showAlert("error", err.response.message);
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  updateSettings,
};
