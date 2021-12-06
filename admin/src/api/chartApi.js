import axiosAdmin from "./axiosAdmin";

const chartApi = {
  getYear: async () => {
    const res = await axiosAdmin.get("/chart/year");
    return res;
  },

  getCategory: async () => {
    const res = await axiosAdmin.get("/chart/category");
    return res;
  },
};

export default chartApi;
