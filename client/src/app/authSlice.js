import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const initialState = {
  current: null,
  loading: false,
  error: "",
};

export const load = createAsyncThunk("auth/load", async () => {
  const res = await authApi.load();
  return res;
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const { username, password } = data;
  const res = await authApi.login(username, password);
  return res;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const { firstname, lastname, username, email, password } = data;
  const res = await authApi.register(
    firstname,
    lastname,
    username,
    email,
    password,
  );
  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.accessToken);
      })

      //register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.accessToken);
      })
      //load
      .addCase(load.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(load.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(load.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload.success) {
          state.current = action.payload.user;
          localStorage.setItem("userId", action.payload.user.userId);
          localStorage.setItem("username", action.payload.user.username);
        } else {
          state.current = {};
        }
      });
  },
});

export default authSlice.reducer;
