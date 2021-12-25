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

  getByDate: async (date) => {
    const url = "/order/bydate";
    const res = await axiosAdmin.post(url, { date });
    return res;
  },
};

export default ordersApi;
