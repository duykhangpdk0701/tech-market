import axiosAdmin from "./axiosAdmin";

const authApi = {
  login: async (username, password) => {
    const res = axiosAdmin.post("/admin/login", { username, password });
    return res;
  },
};

export default authApi;
