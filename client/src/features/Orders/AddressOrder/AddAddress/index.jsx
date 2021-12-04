import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../custom-fields/InputFields";
import * as Yup from "yup";
import style from "./AddAddress.module.scss";
import { useDispatch } from "react-redux";
import { addAddressAsync } from "../../../../app/addressSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setSnackbar } from "../../../../app/snackbarSlice";

const AddAddress = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const action = await addAddressAsync({ ...values, userId });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thêm địa chỉ thành công!",
        }),
      );
      setLoading(false);
      setOpen(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Thêm địa chỉ không thành công!",
        }),
      );
      setLoading(false);
      setOpen(false);
    }
  };

  const initialValues = {
    street: "",
    district: "",
    province: "",
  };

  const validiationSchema = Yup.object().shape({
    street: Yup.string().required("Vui lòng nhập số đường và tên đường"),
    district: Yup.string().required("Vui lòng nhập tên quận"),
    province: Yup.string().required("Vui lòng nhập Thành phố"),
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validiationSchema}
        onSubmit={handleSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <DialogTitle>Thêm địa chỉ</DialogTitle>
              <DialogContent className={style.content}>
                <FastField
                  name="street"
                  component={InputField}
                  label="Đường:"
                  placeholder="7 Tân Quý"
                  bsSize="small"
                />

                <FastField
                  name="district"
                  component={InputField}
                  label="Quận:"
                  placeholder="Quận Tân Phú"
                  bsSize="small"
                />

                <FastField
                  name="province"
                  component={InputField}
                  label="Thành Phố:"
                  placeholder="Thành phố Hồ Chí Minh"
                  bsSize="small"
                />
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit">
                  Thêm
                </LoadingButton>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddAddress;
