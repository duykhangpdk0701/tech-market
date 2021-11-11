import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchProductsAsync = createAsyncThunk(
  "admin/fetchProductsAsync",
  async () => {
    const res = await productsApi.fetchProducts();
    return res;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.current = action.payload.products;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
        console.log(state.current);
      });
  },
});

export default productsSlice.reducer;
