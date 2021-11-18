import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartsApi from "../api/cartApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const fetchCartsAsync = createAsyncThunk("carts/fetch", async (data) => {
  const { user } = data;
  const res = await cartsApi.fetchCartApi(user);
  return res;
});

export const addToCartAsync = createAsyncThunk("carts/add", async (data) => {
  const { userId, productId, quantity } = data;
  const res = await cartsApi.addWishlist(userId, productId, quantity);
  return res;
});

export const CartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch cart
      .addCase(fetchCartsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchCartsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.carts;
      })

      // add cart
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.carts;
      });
  },
});

export default CartsSlice.reducer;
