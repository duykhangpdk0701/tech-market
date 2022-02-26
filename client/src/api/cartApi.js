import axiosClient from "./axiosClient";

const cartsApi = {
  fetchCartApi: async (productIds) => {
    const url = "/cart";
    const res = axiosClient.post(url, { productIds });
    return res;
  },
};

export default cartsApi;
