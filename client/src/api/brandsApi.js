import axiosClient from "./axiosClient";
import queryString from "query-string";

const brandsApi = {
  fetchBrands: async (query) => {
    const url = "/brand";
    const res = axiosClient.get(
      queryString.stringifyUrl({
        url,
        query: {
          category: query,
        },
      }),
    );
    return res;
  },

  fetchAllBrands: async () => {
    const url = "/brand";
    const res = axiosClient.get(url);
    return res;
  },
};

export default brandsApi;
