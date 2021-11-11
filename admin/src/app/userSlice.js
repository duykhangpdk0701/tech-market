import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchUsersAsync = createAsyncThunk(
  "admin/fetchUsers",
  async () => {
    const res = await userApi.fetchUsers();
    return res;
  },
);

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.current = action.payload.users;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
        console.log(state.current);
      });
  },
});

export default usersSlice.reducer;
