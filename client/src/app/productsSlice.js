import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";

const initialState = {
  current: [],
  loading: false,
  error: "",
};

export const fetchProduct = createAsyncThunk("products/fetch", async () => {
  const res = await productsApi.fetchProduct();
  return res;
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.products;
      });
  },
});

export default productSlice.reducer;
