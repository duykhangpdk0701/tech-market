import axiosClient from "./axiosClient";
import queryString from "query-string";

const brandsApi = {
  fetchBrands: async (query) => {
    console.log(query);
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
};

export default brandsApi;
