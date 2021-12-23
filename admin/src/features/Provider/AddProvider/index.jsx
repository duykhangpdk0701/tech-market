import { LoadingButton } from "@mui/lab";
import { Card, Typography, Box, Button } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addProviderAsync } from "../../../app/providersSlice";
import { setSnackbar } from "../../../app/snackBarSlice";
import { store } from "../../../app/store";
import InputField from "../../../components/CustomField/InputField";

const AddProvider = () => {
  const dispatch = useDispatch();
  const initialValue = {
    name: "",
    email: "",
    address: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    address: Yup.string().required(),
    phone: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      const action = await addProviderAsync(values);
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thêm thành công",
        }),
      );
    } catch (err) {
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Thêm không thành công",
        }),
      );
    }
  };

  return (
    <div>
      <Card>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {(formikProps) => {
            return (
              <Form>
                <Typography>Thêm Nhà cung cấp</Typography>
                <Box>
                  <FastField
                    name="name"
                    component={InputField}
                    label="Tên nhà cung cấp"
                    placeholder="Tên nhà cung cấp"
                  />
                </Box>
                <Box>
                  <FastField
                    name="email"
                    component={InputField}
                    label="Địa chỉ email"
                    placeholder="vidu@gmail.com"
                  />
                </Box>

                <Box>
                  <FastField
                    name="address"
                    component={InputField}
                    label="Địa chỉ"
                    placeholder="12 đường..."
                  />
                </Box>

                <Box>
                  <FastField
                    name="phone"
                    component={InputField}
                    label="điện thoại"
                    placeholder="0123456789"
                  />
                </Box>
                <Box>
                  <LoadingButton type="submit" variant="contained">
                    Xác Nhận
                  </LoadingButton>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default AddProvider;
