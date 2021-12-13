import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import usersReducer from "./userSlice";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
import snackBarSlice from "./snackBarSlice";
import categoriesSlice from "./categorySlice";
import brandsSlice from "./brandsSlice";
import chartSlice from "./chartSlice";
import ordersSlice from "./orderSlice";
import selectStatusSlice from "./selectStatus";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    products: productsReducer,
    auth: authReducer,
    snackbar: snackBarSlice,
    categories: categoriesSlice,
    brands: brandsSlice,
    chart: chartSlice,
    orders: ordersSlice,
    selectStatus: selectStatusSlice,
  },
});
