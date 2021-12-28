import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";

const initialState = {
  current: [],
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (data = null) => {
    const { brand } = data;
    if (data) {
      const { arrangePrice } = data;
      const res = await productsApi.fetchProducts(brand, arrangePrice);
      return res;
    }
    const res = await productsApi.fetchProducts(brand);
    return res;
  },
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.products;
      });
  },
});

export default productSlice.reducer;
