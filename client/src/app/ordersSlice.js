import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

const initialState = {
  current: {},
  loading: false,
  error: "",
};

export const addOrderAsync = createAsyncThunk(
  "order/addAsync",
  async (data) => {
    const res = orderApi.addOrder(data);
    return res;
  },
);

export const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOder: (state, acion) => {
      state.current = {
        ...state.current,
        carts: acion.payload.carts,
        promo: acion.payload.promo || null,
      };
    },

    addAddress: (state, action) => {
      state.current = {
        ...state.current,
        address: action.payload,
      };
    },

    addPaymentMethod: (state, action) => {
      state.current = {
        ...state.current,
        paymentMethod: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addOder, addAddress, addPaymentMethod } = ordersSlice.actions;

export default ordersSlice.reducer;
