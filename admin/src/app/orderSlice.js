import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersApi from "../api/ordersApi";

const initialState = {
  loading: false,
  current: [],
  currentSta: [],
  sum: 0,
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

export const getByDateOrderAsync = createAsyncThunk(
  "orders/getByDateOrderAsync",
  async (data) => {
    const { date } = data;
    const res = await ordersApi.getByDate(date);
    return res;
  },
);

export const getByAmountOfDateOrderAsync = createAsyncThunk(
  "orders/getByAmountOfDateOrderAsync",
  async (data) => {
    const { startDate, endDate } = data;
    const res = await ordersApi.getByAmountOfDate(startDate, endDate);
    return res;
  },
);

export const getAllDateOrderAsync = createAsyncThunk(
  "orders/getAllDateOrderAsync",
  async () => {
    const res = await ordersApi.getAllDate();
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
      })

      .addCase(getByDateOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByDateOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.currentSta = [];
        state.sum = 0;
      })
      .addCase(getByDateOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSta = action.payload.orders;
        state.sum = action.payload.sum;
      })

      .addCase(getByAmountOfDateOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByAmountOfDateOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.currentSta = [];
        state.sum = 0;
      })
      .addCase(getByAmountOfDateOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSta = action.payload.orders;
        state.sum = action.payload.sum;
      })

      .addCase(getAllDateOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDateOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.currentSta = [];
        state.sum = 0;
      })
      .addCase(getAllDateOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSta = action.payload.orders;
        state.sum = action.payload.sum;
      });
  },
});

export default ordersSlice.reducer;
