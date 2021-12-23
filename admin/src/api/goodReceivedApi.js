import axiosAdmin from "./axiosAdmin";

const goodReceivedApi = {
  getAll: async () => {
    const url = "goodsreceived";
    const res = await axiosAdmin.get(url);
    return res;
  },
};

export default goodReceivedApi;
