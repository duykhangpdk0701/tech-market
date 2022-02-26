import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusAsync } from "../../../app/orderSlice";
import { closeDialog } from "../../../app/selectStatus";
import { setSnackbar } from "../../../app/snackBarSlice";

const DialogSetStatus = () => {
  const dispatch = useDispatch();
  const isOpenDialog = useSelector((state) => state.selectStatus.openDialog);
  const statusOpenDialog = useSelector((state) => state.selectStatus.status);
  const idOpenDialog = useSelector((state) => state.selectStatus.id);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(statusOpenDialog);
  }, [statusOpenDialog]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const hanldeSumit = async (e) => {
    try {
      const action = await setStatusAsync({
        id: idOpenDialog,
        status: status,
      });
      const aciontResult = await dispatch(action);
      await unwrapResult(aciontResult);
      dispatch(closeDialog());
      setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thành công",
        }),
      );
    } catch (error) {
      dispatch(closeDialog());
      setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Không thành công",
        }),
      );
    }
  };

  return (
    <Dialog
      maxWidth="xs"
      open={isOpenDialog}
      onClose={() => {
        dispatch(closeDialog());
      }}>
      <DialogTitle>Set status account</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Age"
            onChange={handleChange}>
            <MenuItem value={1}>Đang chờ xác nhận</MenuItem>
            <MenuItem value={2}>Đang giao hàng</MenuItem>
            <MenuItem value={3}>Đã giao</MenuItem>
            <MenuItem value={0}>Đã huỷ</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            dispatch(closeDialog());
          }}>
          Cancel
        </Button>
        <LoadingButton onClick={hanldeSumit} loading={loading}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSetStatus;
