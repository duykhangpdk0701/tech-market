import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartsApi from "../api/cartApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const fetchCartsAsync = createAsyncThunk("carts/fetch", async (data) => {
  const { carts } = data;
  const productIds = carts.map((item) => item.productId);
  const res = await cartsApi.fetchCartApi(productIds);
  return res;
});

export const CartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    getLocalCart: (state) => {
      state.current = JSON.parse(localStorage.getItem("cart")) || [];
    },

    addToCart: (state, action) => {
      if (localStorage.getItem("cart")) {
        const arrayCart = JSON.parse(localStorage.getItem("cart"));
        let added = false;
        for (const iterator in arrayCart) {
          if (arrayCart[iterator].productId === action.payload) {
            arrayCart[iterator].quantity++;
            added = true;
          }
        }

        state.current.forEach((item) => {
          if (item.productId === action.payload) {
            item.quantity++;
          }
        });

        if (!added) {
          arrayCart.push({ productId: action.payload, quantity: 1 });
          state.current.push({ productId: action.payload, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(arrayCart));
      } else {
        const arrayCart = [{ productId: action.payload, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(arrayCart));
        state.current = arrayCart;
      }
    },

    removeCart: (state, action) => {
      const localCart = JSON.parse(localStorage.getItem("cart")) || false;
      const indexOfCart = localCart
        .map((e) => e.productId)
        .indexOf(action.payload);

      if (indexOfCart >= 0) {
        localCart.splice(indexOfCart, 1);
        state.current.splice(indexOfCart, 1);
        localStorage.setItem("cart", JSON.stringify(localCart));
      }
    },

    increaseQuantityOfCart: (state, action) => {
      const arrayCart = JSON.parse(localStorage.getItem("cart"));
      arrayCart.forEach((element) => {
        if (element.productId === action.payload) {
          element.quantity++;
        }
      });
      state.current.forEach((element) => {
        if (element.productId === action.payload) {
          element.quantity++;
        }
      });
      localStorage.setItem("cart", JSON.stringify(arrayCart));
    },

    decreaseQuantityOfCart: (state, action) => {
      const arrayCart = JSON.parse(localStorage.getItem("cart"));
      arrayCart.forEach((element) => {
        if (element.productId === action.payload) {
          element.quantity--;
        }
      });
      state.current.forEach((element) => {
        if (element.productId === action.payload) {
          element.quantity--;
        }
      });

      localStorage.setItem("cart", JSON.stringify(arrayCart));
    },

    changeQuantityOfCart: (state, action) => {
      const arrayCart = JSON.parse(localStorage.getItem("cart"));
      arrayCart.forEach((element) => {
        if (element.productId === action.payload.productId) {
          element.quantity = action.payload.quantity;
        }
      });
      state.current.forEach((element) => {
        if (element.productId === action.payload) {
          element.quantity--;
        }
      });
      localStorage.setItem("cart", JSON.stringify(arrayCart));
    },

    clearCart: (state) => {
      localStorage.removeItem("cart");
      state.current = [];
    },
  },

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
        for (const key in state.current) {
          state.current[key] = {
            ...state.current[key],
            product: action.payload.carts[key],
          };
        }
      });
  },
});

export const {
  addToCart,
  removeCart,
  getLocalCart,
  increaseQuantityOfCart,
  decreaseQuantityOfCart,
  changeQuantityOfCart,
  clearCart,
} = CartsSlice.actions;

export default CartsSlice.reducer;
