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
  updateMyPassword: (data) => {
    const url = `/users/updateMyPassword`;
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
  manageuser: (payload) => {
    const url = `/users`;
    return axiosClient.get(url, { headers: authHeader() }, { params: payload });
  },
  deleteUser: (id) => {
    const url = `/users/` + id;
    return axiosClient.delete(url, { headers: authHeader() });
  },
  updateUser: (id, data) => {
    const url = `/users/` + id;
    return axiosClient.patch(url, data, { headers: authHeader() });
  },
};

export default userApi;
