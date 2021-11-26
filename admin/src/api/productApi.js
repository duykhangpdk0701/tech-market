import axiosAdmin from "./axiosAdmin";

const productsApi = {
  fetchProducts: async () => {
    const res = axiosAdmin.get("/product");
    return res;
  },

  fetchProduct: async (id) => {
    const res = axiosAdmin.get(`/product${id}`);
    return res;
  },

  disactiveProduct: async (id, isActive) => {
    const res = axiosAdmin.put(`/product/permit`, { id, isActive });
    return res;
  },
};

export default productsApi;
