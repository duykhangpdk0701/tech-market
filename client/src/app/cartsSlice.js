import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartsApi from "../api/cartApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const fetchCartsAsync = createAsyncThunk("carts/fetch", async (data) => {
  const user = { data };
  const res = await cartsApi.fetchCartApi(user);
  return res;
});

export const CartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch categories
      .addCase(fetchCartsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchCartsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.brands;
      });
  },
});

export default CartsSlice.reducer;
