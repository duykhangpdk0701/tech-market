import { createSlice, current } from "@reduxjs/toolkit";

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
  },
  extraReducers: (builder) => {},
});

export const { addOder, address } = ordersSlice.actions;

export default ordersSlice.reducer;
