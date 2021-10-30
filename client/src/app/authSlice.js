import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const initialState = {
  current: {
    username: "",
  },
  loading: false,
  error: "",
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const { username, password } = data;
  const res = await authApi.login(username, password);
  return res;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    data;
  const res = await authApi.register(
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
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
        state.current = action.payload.user;
        localStorage.setItem("token", action.payload.token);
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
        state.currentUser = action.payload;
      });
  },
});

export default authSlice.reducer;
