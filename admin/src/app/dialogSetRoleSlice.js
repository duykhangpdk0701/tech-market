import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openDialog: false,
  statusValue: 0,
  id: "",
  status: 0,
};

export const dialogSetRole = createSlice({
  name: "selectStatus",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.openDialog = true;
    },

    setValue: (state, action) => {
      state.id = action.payload.id;
      state.status = action.payload.status;
    },

    closeDialog: (state) => {
      state.openDialog = false;
    },
    setStatus: (state, action) => {
      state.statusValue = action.payload;
    },
  },
});

export const { openDialog, setValue, closeDialog, setStatus } =
  dialogSetRole.actions;

export default dialogSetRole.reducer;
