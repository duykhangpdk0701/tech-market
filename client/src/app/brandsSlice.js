import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandsApi from "../api/brandsApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const fetchBrands = createAsyncThunk("brands/fetch", async (data) => {
  const res = await brandsApi.fetchBrands(data);
  return res;
});

export const fetchAllBrands = createAsyncThunk("brands/fetch", async () => {
  const res = await brandsApi.fetchAllBrands();
  return res;
});

export const BrandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch categories
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.brands;
      });
  },
});

export default BrandsSlice.reducer;
