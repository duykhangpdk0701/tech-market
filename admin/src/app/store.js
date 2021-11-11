import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import usersReducer from "./userSlice";
import productsSlice from "./productsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    products: productsSlice,
  },
});
