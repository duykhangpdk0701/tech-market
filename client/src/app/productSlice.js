import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";

const initialState = {
  current: {},
  loading: false,
  error: "",
};

export const fetchProduct = createAsyncThunk("products/fetch", async (data) => {
  const { id } = data;
  const res = await productsApi.fetchProduct(id);
  return res;
});

export const productSlice = createSlice({
  name: "product",
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
        state.current = action.payload.product;
      });
  },
});

export default productSlice.reducer;
