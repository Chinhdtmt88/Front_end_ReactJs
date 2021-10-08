import axios from "axios";

export function login(email, password) {
  const postData = {
    email,
    password,
  };
  return axios.post("http://127.0.0.1:3000/api/v1/users/login", postData);
}
