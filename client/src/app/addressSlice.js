import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addressApi from "../api/addressApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const fetchAdressAsync = createAsyncThunk(
  "address/fetch",
  async (data) => {
    const { userId } = data;
    const res = await addressApi.getById(userId);
    return res;
  },
);

export const AdressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch categories
      .addCase(fetchAdressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchAdressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.address;
      });
  },
});

export default AdressSlice.reducer;
