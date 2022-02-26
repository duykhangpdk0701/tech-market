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
import { closeDialog } from "../../../app/dialogSetRoleSlice";
import { setSnackbar } from "../../../app/snackBarSlice";
import { ACCOUNTANT, MANAGER, STAFF } from "../../../constant/role";
import { changeRoleAsync } from "../../../app/adminSlice";

const DialogSetRole = () => {
  const dispatch = useDispatch();
  const isOpenDialog = useSelector((state) => state.setRole.openDialog);
  const statusOpenDialog = useSelector((state) => state.setRole.status);
  const idOpenDialog = useSelector((state) => state.setRole.id);
  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRole(statusOpenDialog);
  }, [statusOpenDialog]);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const action = await changeRoleAsync({
        id: idOpenDialog,
        role: role,
      });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
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
      <DialogTitle>Chỉnh sử chức vụ</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="demo-simple-select-label">Chức Vụ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Age"
            onChange={handleChange}>
            <MenuItem value={MANAGER.value}>{MANAGER.label}</MenuItem>
            <MenuItem value={ACCOUNTANT.value}>{ACCOUNTANT.label}</MenuItem>
            <MenuItem value={STAFF.value}>{STAFF.label}</MenuItem>
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
        <LoadingButton onClick={handleSubmit} loading={loading}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSetRole;
