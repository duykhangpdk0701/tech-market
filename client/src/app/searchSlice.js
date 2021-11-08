import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";

const initialState = {
  current: [],
  loading: false,
  error: "",
};

export const fetchSearch = createAsyncThunk("search/fetch", async () => {
  const res = await productsApi.fetchProducts();
  return res;
});

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.products;
      });
  },
});

export default searchSlice.reducer;
