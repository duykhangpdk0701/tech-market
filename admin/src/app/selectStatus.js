import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openDialog: false,
  statusValue: 0,
  id: "",
};

export const selectStatus = createSlice({
  name: "selectStatus",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.openDialog = true;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    closeDialog: (state) => {
      state.openDialog = false;
    },
    setStatus: (state, action) => {
      state.statusValue = action.payload;
    },
  },
});

export const { openDialog, setId, closeDialog, setStatus } =
  selectStatus.actions;

export default selectStatus.reducer;
