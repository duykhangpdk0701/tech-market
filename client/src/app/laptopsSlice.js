import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import laptopApi from "../api/laptopsApi";

const initialState = {
  current: [],
  loading: false,
  error: "",
};

export const fetchLaptops = createAsyncThunk("laptops/fetch", async () => {
  const res = await laptopApi.fetchLaptop();
  return res;
});

export const laptopsSlice = createSlice({
  name: "laptops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchLaptops.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaptops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchLaptops.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.laptops;
      });
  },
});

export default laptopsSlice.reducer;
