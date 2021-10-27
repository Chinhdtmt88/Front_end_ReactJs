import { showAlert } from "../ultil/alert";
import axiosClient from "../api/axiosClient";
import userApi from "../api/userApi";
import authService from "../services/auth.service";
import authHeader from "./auth-header";

const getPublicContent = () => {
  const url = "/tours";
  return axiosClient.get(url, { headers: authHeader() });
};

const updateSettings = async (name, email, photo) => {
  try {
    const currentData = authService.getCurrentUser();
    const url = `/users/${currentData._id}`;

    const response = await axiosClient.patch(url, { name, email, photo });
    console.log(response);
    if (response.status === "success") {
      showAlert("success");
    }
  } catch (err) {
    showAlert("error");
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  updateSettings,
};
