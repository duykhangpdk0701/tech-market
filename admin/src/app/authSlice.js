import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const initialState = {
  loading: false,
  current: {},
  error: "",
};

export const loginAsync = createAsyncThunk("admin/loginAsync", async (data) => {
  const { username, password } = data;
  const res = await authApi.login(username, password);
  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.admin;
        localStorage.setItem("adminId", action.payload.admin._id);
        localStorage.setItem("adminName", action.payload.admin.username);
      });
  },
});

export default authSlice.reducer;
