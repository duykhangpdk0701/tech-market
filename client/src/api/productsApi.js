import axiosClient from "./axiosClient";

const productsApi = {
  fetchProduct: async () => {
    const url = "/product";
    const res = axiosClient.get(url);
    return res;
  },
};

export default productsApi;
