import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      console.log(action);
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;

      return {
        ...state,
        snackbarOpen,
        snackbarMessage,
        snackbarType,
      };
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
