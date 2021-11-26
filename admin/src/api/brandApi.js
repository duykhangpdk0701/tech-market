import axiosAdmin from "./axiosAdmin";

const brandsApi = {
  fetchBrand: async () => {
    const res = await axiosAdmin.get("/brand");
    return res;
  },
};

export default brandsApi;
