import axiosAdmin from "./axiosAdmin";

const brandsApi = {
  fetchBrand: async () => {
    const res = await axiosAdmin.get("/brand");
    return res;
  },

  addBrand: async (data) => {
    const res = await axiosAdmin.post("/brand/store", { ...data });
    return res;
  },

  updateBrand: async (data) => {
    const res = await axiosAdmin.put("/brand/" + data._id, { ...data });
    return res;
  },
};

export default brandsApi;
