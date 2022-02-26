import axiosClient from "./axiosClient";
import queryString from "query-string";

const productsApi = {
  fetchProducts: async (brand = null, arrangePrice = null) => {
    let url = "/product?";
    if (brand) {
      url += queryString.stringify(
        { brand: brand },
        { arrayFormat: "bracket" },
      );
    }

    if (arrangePrice) {
      url += `&max=${arrangePrice[1]}&min=${arrangePrice[0]}`;
    }

    const res = axiosClient.get(url);
    return res;
  },

  fetchProduct: async (id) => {
    const url = "/product/" + id;
    const res = axiosClient.get(url);
    return res;
  },
};

export default productsApi;
