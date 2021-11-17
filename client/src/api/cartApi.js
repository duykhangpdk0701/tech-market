import axiosClient from "./axiosClient";

const cartsApi = {
  fetchCartApi: async (userId) => {
    const url = "/cart/";
    const res = axiosClient.post(url, { user: userId });
    return res;
  },
};

export default cartsApi;
