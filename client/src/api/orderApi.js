import axiosClient from "./axiosClient";

const orderApi = {
  addOrder: async (data) => {
    const url = "/order/store";
    const res = await axiosClient.post(url, data);
    return res;
  },

  getOrderedByUserId: async (userId) => {
    const url = "/order/byuserid";
    const res = await axiosClient.post(url, { userId });
    return res;
  },

  getOrderDetailById: async (id) => {
    const url = "/order/orderdetail";
    const res = await axiosClient.post(url, { id });
    return res;
  },

  setStatus: async (id, status) => {
    const url = "/order/status";
    const data = { id, status };
    const res = await axiosClient.put(url, data);
    return res;
  },

  getOrderById: async (id) => {
    const url = "/order/" + id;
    const res = await axiosClient.get(url);
    return res;
  },
};

export default orderApi;
