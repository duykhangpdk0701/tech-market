import axiosClient from "./axiosClient";

const authApi = {
  load: () => {
    return axiosClient.get('user/load')
  },

  login(username, password) {
    const url = "/user/login";
    const res = axiosClient.post(url, { username, password });
    return res;
  },

  register(firstname, lastname, username, email, password) {
    const url = "/user/register";
    try {
      return axiosClient.post(url, {
        firstname,
        lastname,
        username,
        email,
        password,
      });
    } catch (error) {
      return error;
    }
  },
};

export default authApi;
