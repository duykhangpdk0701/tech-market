import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

const initialState = {
  current: [],
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

export const setStatusAsync = createAsyncThunk(
  "orders/setStatusAsync",
  async (data) => {
    const { id, status } = data;
    const res = await orderApi.setStatus(id, status);
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
      })

      .addCase(setStatusAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(setStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(setStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        const order = action.payload.order;
        state.current.forEach((item) => {
          if (item._id === order._id) {
            item.status = order.status;
          }
        });
      });
  },
});

export default ordersSlice.reducer;
