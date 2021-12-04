import axiosClient from "./axiosClient";

const orderApi = {
  addOrder: async (data) => {
    const url = "/order/store";
    const res = await axiosClient.post(url, data);
    return res;
  },
};

export default orderApi;
