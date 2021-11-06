import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";
import productReducer from "./productSlice";
import laptopsReducer from "./laptopsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
    laptops: laptopsReducer,
  },
});
