import axiosClient from "./axiosClient";

const phoneApi = {
  fetchPhone: async () => {
    const url = "/product/products/phone";
    const res = axiosClient.get(url);
    return res;
  },
};

export default phoneApi;
