import axiosAdmin from "./axiosAdmin";

const providerApi = {
  getAll: async () => {
    const url = "/provider";
    const res = await axiosAdmin.get(url);
    return res;
  },

  add: async (data) => {
    const url = "/provider";
    const res = await axiosAdmin.post(url, data);
    return res;
  },
};

export default providerApi;
