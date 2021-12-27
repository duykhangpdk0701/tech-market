import axiosAdmin from "./axiosAdmin";

const brandsApi = {
  fetchBrand: async () => {
    const res = await axiosAdmin.get("/brand");
    return res;
  },

  fetchBrandById: async (id) => {
    const res = await axiosAdmin.get("/brand/" + id);
    return res;
  },

  addBrand: async (data) => {
    const res = await axiosAdmin.post("/brand/store", { ...data });
    return res;
  },

  updateBrand: async (data) => {
    const res = await axiosAdmin.put("/brand", data);
    return res;
  },
};

export default brandsApi;
