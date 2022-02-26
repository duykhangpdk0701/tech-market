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
  getByAmountOfDate: async (startDate, endDate) => {
    const url = "/order/byamountofdate";
    const res = await axiosAdmin.post(url, { startDate, endDate });
    return res;
  },

  getAllDate: async () => {
    const url = "/order/byalldate";
    const res = await axiosAdmin.get(url);
    return res;
  },

  getOrderById: async (id) => {
    const url = "/order/" + id;
    const res = await axiosAdmin.get(url);
    return res;
  },
};

export default ordersApi;
