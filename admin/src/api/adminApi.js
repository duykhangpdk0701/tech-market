import axiosAdmin from "./axiosAdmin";

const adminApi = {
  getAll: async () => {
    const res = axiosAdmin.get("/admin/admin");
    return res;
  },
  changeRoll: async (data) => {
    const res = axiosAdmin.put("/admin/admin/role", data);
    return res;
  },
};

export default adminApi;
