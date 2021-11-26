import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesApi from "../api/categoryApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchCategoriesAsync = createAsyncThunk(
  "category/fetchProductsAsync",
  async () => {
    const res = await categoriesApi.fetchCategory();
    return res;
  },
);

export const categoriessSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.categories;
      });
  },
});

export default categoriessSlice.reducer;
