import axiosAdmin from "./axiosAdmin";

const ordersApi = {
  getOrder: async () => {
    const url = "/order";
    const res = await axiosAdmin.get(url);
    return res;
  },

  setStatus: async (data) => {
    const url = "/order/status";
    const res = await axiosAdmin.put(url, data);
    return res;
  },
};

export default ordersApi;
