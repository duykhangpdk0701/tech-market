import axiosClient from "./axiosClient";

const laptopApi = {
  fetchLaptop: async () => {
    const url = "/laptop";
    const res = axiosClient.get(url);
    return res;
  },
};

export default laptopApi;
