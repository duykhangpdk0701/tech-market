import axiosAdmin from "./axiosAdmin";

const productsApi = {
  fetchProducts: async () => {
    const res = await axiosAdmin.get("/product");
    return res;
  },

  fetchProduct: async (id) => {
    const res = await axiosAdmin.get(`/product${id}`);
    return res;
  },

  disactiveProduct: async (id, isActive) => {
    const res = await axiosAdmin.put(`/product/permit`, { id, isActive });
    return res;
  },

  addProdutc: async (formData) => {
    const res = await axiosAdmin.post("/product/store", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return res;
  },
};

export default productsApi;
