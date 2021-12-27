import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

const initialState = {
  current: {},
  loading: false,
  error: "",
};

export const getOrderDetailByIdAsync = createAsyncThunk(
  "orderDetail/getOrderDetailByIdAsync",
  async (data) => {
    const { id } = data;
    const res = orderApi.getOrderedByUserId(id);
    return res;
  },
);

export const ordersSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetailByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrderDetailByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.orderDetail;
      });
  },
});

export default ordersSlice.reducer;
