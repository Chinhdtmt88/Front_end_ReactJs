import axiosClient from "./axiosClient";
import authHeader from "../services/auth-header";
const userApi = {
  getuser: () => {
    const url = "/users/";
    return axiosClient.get(url);
  },
  updateSetting: (data) => {
    const url = `/users/${data.setting_id}`;
    if (data.setting_id) delete data.setting_id;
    return axiosClient.patch(url, data, { headers: authHeader() });
  },
};

export default userApi;
