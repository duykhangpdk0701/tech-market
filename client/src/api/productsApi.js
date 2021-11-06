import axiosClient from "./axiosClient";

const productsApi = {
  fetchProducts: async () => {
    const url = "/product";
    const res = axiosClient.get(url);
    return res;
  },

  fetchProduct: async (id) => {
    const url = "/product/" + id;
    const res = axiosClient.get(url);
    return res;
  },
};

export default productsApi;
