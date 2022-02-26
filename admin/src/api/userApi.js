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

  toggleActvieUser: async (id, isActive) => {
    const res = axiosAdmin.put(`admin/toggle-active`, { id, isActive });
    return res;
  },
};

export default userApi;
