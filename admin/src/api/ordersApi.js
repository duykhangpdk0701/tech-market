import axiosAdmin from "./axiosAdmin";

const ordersApi = {
  getOrder: async () => {
    const url = "/order";
    const res = await axiosAdmin.get(url);
    return res;
  },
};

export default ordersApi;
