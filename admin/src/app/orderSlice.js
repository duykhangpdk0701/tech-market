import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersApi from "../api/ordersApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchOrdersAsync = createAsyncThunk(
  "orders/fetchOrderAsync",
  async () => {
    const res = await ordersApi.getOrder();
    return res;
  },
);

export const setStatusAsync = createAsyncThunk(
  "orders/setStatusAsync",
  async (data) => {
    const res = await ordersApi.setStatus(data);
    return res;
  },
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.orders;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
      })

      .addCase(setStatusAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(setStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(setStatusAsync.fulfilled, (state, action) => {
        const order = action.payload.order;
        state.loading = false;
        state.current.forEach((item) => {
          if (item._id === order._id) {
            item.status = order.status;
          }
        });
      });
  },
});

export default ordersSlice.reducer;
