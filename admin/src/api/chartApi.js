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

  getDay: async (date) => {
    const res = await axiosAdmin.post("/chart/bydate", { date });
    return res;
  },
};

export default chartApi;
