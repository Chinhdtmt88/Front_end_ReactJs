import axiosClient from "../api/axiosClient";

const register = (username, email, passwordConfirm, password) => {
  const url = "/users/signup";
  return axiosClient.post(url, {
    username,
    email,
    passwordConfirm,
    password,
  });
};

const login = (email, password) => {
  const url = "/users/login";
  return axiosClient
    .post(url, {
      email,
      password,
    })
    .then((response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  getCurrentUser,
};
