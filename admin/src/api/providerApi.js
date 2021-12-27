import axiosAdmin from "./axiosAdmin";

const providerApi = {
  getAll: async () => {
    const url = "/provider";
    const res = await axiosAdmin.get(url);
    return res;
  },

  getById: async (id) => {
    const url = "/provider/";
    const res = await axiosAdmin.get(url + id);
    return res;
  },
  add: async (data) => {
    const url = "/provider";
    const res = await axiosAdmin.post(url, data);
    return res;
  },

  update: async (data) => {
    const url = "/provider";
    const res = await axiosAdmin.put(url, data);
    return res;
  },
};

export default providerApi;
