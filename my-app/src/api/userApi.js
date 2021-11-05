import axiosClient from "./axiosClient";
import authHeader from "../services/auth-header";
const userApi = {
  getMe: () => {
    const url = "/users/me";
    return axiosClient.get(url, { headers: authHeader() });
  },
  updateMe: (data) => {
    // const url = `/users/${data.setting_id}`;
    const url = `/users/updateMe`;
    // if (data.setting_id) delete data.setting_id;
    return axiosClient.patch(url, JSON.stringify(data), {
      headers: authHeader(),
    });
  },
  updateAdmnin: (data) => {
    const url = `/users/${data.setting_id}`;

    // if (data.setting_id) delete data.setting_id;
    return axiosClient.patch(url, JSON.stringify(data), {
      headers: authHeader(),
    });
  },
};

export default userApi;
