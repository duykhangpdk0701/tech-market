import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goodReceivedApi from "../api/goodReceivedApi";

const initialState = {
  loading: false,
  current: {},
  error: "",
};

export const getByIdGoodReceivedAsync = createAsyncThunk(
  "goodReceivedDetail/getByIdGoodReceivedAsync",
  async ({ id }) => {
    const res = await goodReceivedApi.getById(id);
    return res;
  },
);

export const goodReceivedDetailSlice = createSlice({
  name: "goodReceivedDetail",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getByIdGoodReceivedAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByIdGoodReceivedAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getByIdGoodReceivedAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.goodsReceivedDetail;
      });
  },
});

export default goodReceivedDetailSlice.reducer;
