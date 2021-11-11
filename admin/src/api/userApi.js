import axiosAdmin from "./axiosAdmin";

const userApi = {
  fetchUsers: async () => {
    const res = axiosAdmin.get("/admin/getUsers");
    return res;
  },

  fetchUser: async (id) => {
    const res = axiosAdmin.get(`/admin/getUsers/${id}`);
    return res;
  },
};

export default userApi;
