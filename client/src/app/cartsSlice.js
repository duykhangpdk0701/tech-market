import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartsApi from "../api/cartApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const fetchCartsAsync = createAsyncThunk("carts/fetch", async (data) => {
  const { userId } = data;
  const res = await cartsApi.fetchCartApi(userId);
  return res;
});

export const addToCartAsync = createAsyncThunk("carts/add", async (data) => {
  const { userId, productId, quantity } = data;
  const res = await cartsApi.addWishlist(userId, productId, quantity);
  return res;
});

export const removeCartAsync = createAsyncThunk(
  "carts/remove",
  async (data) => {
    const { cartId } = data;
    const res = await cartsApi.removeCart(cartId);
    return res;
  },
);

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
        if (
          state.current.some((cart) => cart._id === action.payload.carts._id)
        ) {
          state.current = state.current.filter((item) => {
            if (
              item.user === action.payload.carts.user &&
              item.product._id === action.payload.carts.product
            ) {
              item.quantity = action.payload.carts.quantity;
              return item;
            }
            return item;
          });
        } else {
          state.current.push(action.payload.carts);
        }
      })

      // remove cart
      .addCase(removeCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removeCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = state.current.filter((item) => {
          return item._id !== action.payload.cart._id;
        });
      });
  },
});

export default CartsSlice.reducer;
