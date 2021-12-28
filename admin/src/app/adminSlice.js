import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../api/adminApi";

const initialState = {
  loading: false,
  current: {},
  error: "",
};

export const getAllAdminAsync = createAsyncThunk(
  "/admin/getAllAsync",
  async () => {
    const res = await adminApi.getAll();
    return res;
  },
);

export const changeRoleAsync = createAsyncThunk(
  "/admin/changeRoleAsync",
  async (data) => {
    const { id, role } = data;
    const res = await adminApi.changeRoll({ id, role });
    return res;
  },
);

export const addAdminAsync = createAsyncThunk(
  "/admin/addAdminAsync",
  async (data) => {
    const res = await adminApi.add(data);
    return res;
  },
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdminAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllAdminAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.admins;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
      })

      .addCase(changeRoleAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeRoleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(changeRoleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current.forEach((item) => {
          if (item._id === action.payload.admin._id) {
            item.role = action.payload.admin.role;
          }
        });
      });
  },
});

export default adminSlice.reducer;
