import axiosAdmin from "./axiosAdmin";

const categoriesApi = {
  fetchCategory: async () => {
    const res = await axiosAdmin.get("/category");
    return res;
  },

  addCategory: async (data) => {
    const res = await axiosAdmin.post("/category/store", { ...data });
    return res;
  },
};

export default categoriesApi;
