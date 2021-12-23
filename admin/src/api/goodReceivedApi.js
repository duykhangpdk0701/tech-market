import axiosAdmin from "./axiosAdmin";

const goodReceivedApi = {
  getAll: async () => {
    const url = "/goodsreceived";
    const res = await axiosAdmin.get(url);
    return res;
  },

  getById: async (id) => {
    const url = "/goodsreceived/";
    const res = await axiosAdmin.get(url + id);
    return res;
  },
};

export default goodReceivedApi;
