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

export const toggleActiveUserAsync = createAsyncThunk(
  "admin/toggleActive",
  async (data) => {
    const { id, isActive } = data;
    const res = await userApi.toggleActvieUser(id, isActive);
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
      })
      // toggle actvie user
      .addCase(toggleActiveUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleActiveUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(toggleActiveUserAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.current.forEach((item) => {
          if (item._id === action.payload.user._id) {
            item.isActive = !item.isActive;
          }
        });
      });
  },
});

export default usersSlice.reducer;
