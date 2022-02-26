import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../app/snackBarSlice";

const CustomizedSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarOpen = useSelector((state) => state.snackbar.snackbarOpen);
  const snackbarType = useSelector((state) => state.snackbar.snackbarType);
  const snackbarMessage = useSelector(
    (state) => state.snackbar.snackbarMessage,
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      setSnackbar({
        snackbarOpen: false,
        snackbarType,
        snackbarMessage,
      }),
    );
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={snackbarType}
          sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbar;
