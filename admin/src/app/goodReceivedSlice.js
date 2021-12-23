import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goodReceived from "../api/goodReceivedApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchGoodReceivedAsync = createAsyncThunk(
  "goodReceived/fetchGoodReceivedAsync",
  async () => {
    const res = await goodReceived.getAll();
    return res;
  },
);

export const goodReceivedSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchGoodReceivedAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGoodReceivedAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchGoodReceivedAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.GoodsReceived;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
      });
  },
});

export default goodReceivedSlice.reducer;
