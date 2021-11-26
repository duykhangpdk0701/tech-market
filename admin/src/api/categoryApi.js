import axiosAdmin from "./axiosAdmin";

const categoriesApi = {
  fetchCategory: async () => {
    const res = await axiosAdmin.get("/category");
    return res;
  },
};

export default categoriesApi;
