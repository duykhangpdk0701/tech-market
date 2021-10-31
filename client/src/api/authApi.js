import axiosClient from "./axiosClient";

const authApi = {
  login(username, password) {
    const url = "/user/login";
    try {
      const res = axiosClient.post(url, { username, password });
      return res;
    } catch (error) {
      return error;
    }
  },

  register(firstname, lastname, username, email, password) {
    const url = "/user/register";
    return axiosClient.post(url, {
      firstname,
      lastname,
      username,
      email,
      password,
    });
  },
};

export default authApi;
