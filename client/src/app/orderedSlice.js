import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

const initialState = {
  current: {},
  loading: false,
  error: "",
};

export const getOrderedByUserIdAsync = createAsyncThunk(
  "order/getOrderedByUserIdAsync",
  async (data) => {
    const { userId } = data;
    const res = orderApi.getOrderedByUserId(userId);
    return res;
  },
);

export const ordersSlice = createSlice({
  name: "ordered",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderedByUserIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderedByUserIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrderedByUserIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.orders;
      });
  },
});

export default ordersSlice.reducer;
