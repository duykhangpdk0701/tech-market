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
import adminSlice from "./adminSlice";
import dialogSetRoleSlice from "./dialogSetRoleSlice";
import goodReceivedSlice from "./goodReceivedSlice";
import providerSlice from "./providersSlice";
import goodReceivedDetailSlice from "./goodReceivedDetailSlice";

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
    admin: adminSlice,
    setRole: dialogSetRoleSlice,
    goodsReceived: goodReceivedSlice,
    goodsReceivedDetail: goodReceivedDetailSlice,
    providers: providerSlice,
  },
});
