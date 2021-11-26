import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandsApi from "../api/brandApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchBrandsAsync = createAsyncThunk(
  "brands/fetchProductsAsync",
  async () => {
    const res = await brandsApi.fetchBrand();
    return res;
  },
);

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.brands;
      });
  },
});

export default brandsSlice.reducer;
