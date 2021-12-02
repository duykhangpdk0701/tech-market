import axiosClient from "./axiosClient";

const addressApi = {
  getById: async (userId) => {
    const url = "/address/" + userId;
    return axiosClient.get(url);
  },

  add: async (data) => {
    const url = "/address";
    return axiosClient.post(url, data);
  },
};

export default addressApi;
