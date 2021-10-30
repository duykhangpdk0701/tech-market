import axiosClient from "./axiosClient";

const authApi = {
  login(username, password) {
    const url = "/auth/login";
    try {
      const res = axiosClient.post(url, { username, password });
      return res;
    } catch (error) {
      return error;
    }
  },
  register(firstName, lastName, username, email, password, confirmPassword) {
    const url = "/auth/register";
    return axiosClient.post(url, {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    });
  },
};

export default authApi;
