import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";
import productReducer from "./productSlice";
import laptopsReducer from "./laptopsSlice";
import brandsReducer from "./brandsSlice";
import phonesReducer from "./phonesSlice";
import searchReducer from "./searchSlice";
import cartsReducer from "./cartsSlice";
import snackbarReducer from "./snackbarSlice";
import orderReducer from "./ordersSlice";
import addressReducer from "./addressSlice";
import orderedSlice from "./orderedSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
    laptops: laptopsReducer,
    brands: brandsReducer,
    phones: phonesReducer,
    search: searchReducer,
    carts: cartsReducer,
    snackbar: snackbarReducer,
    order: orderReducer,
    address: addressReducer,
    ordered: orderedSlice,
  },
});
