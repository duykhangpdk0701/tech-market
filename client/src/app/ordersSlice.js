import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {},
  loading: false,
  error: "",
};

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
  extraReducers: (builder) => {},
});

export const { addOder, addAddress } = ordersSlice.actions;

export default ordersSlice.reducer;
