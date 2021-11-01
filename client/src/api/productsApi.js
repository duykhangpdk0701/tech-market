import axiosClient from "./axiosClient";

const productsApi = {
  fetchProduct() {
    const url = "/product";
    const res = axiosClient.get(url);
    return res;
  },
};

export default productsApi;
