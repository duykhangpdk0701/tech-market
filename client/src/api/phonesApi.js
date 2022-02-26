import axiosClient from "./axiosClient";
import queryString from "query-string";

const phoneApi = {
  fetchPhone: async (brand = null, arrangePrice = null) => {
    let url = "/product/products/phone?";
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
};

export default phoneApi;
