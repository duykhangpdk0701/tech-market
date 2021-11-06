import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import phoneApi from "../api/phonesApi";

const initialState = {
  current: [],
  loading: false,
  error: "",
};

export const fetchPhones = createAsyncThunk("phones/fetch", async () => {
  const res = await phoneApi.fetchPhone();
  return res;
});

export const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchPhones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.laptops;
      });
  },
});

export default phonesSlice.reducer;
