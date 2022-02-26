import { FastField, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../app/store";
import AutoField from "../../../components/CustomField/AutoField";
import { setSnackbar } from "../../../app/snackBarSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addAdminAsync } from "../../../app/adminSlice";
import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import InputField from "../../../components/CustomField/InputField";
import styles from "./AddAdmin.module.scss";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const initialValue = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Bạn cần nhập tên"),
    lastname: Yup.string().required("Bạn cần nhập Họ"),
    username: Yup.string().required("Bạn cần nhập adminname"),
    email: Yup.string().required("Bạn cần nhập email"),
    password: Yup.string().required("Bạn cần nhập password"),
  });

  const handleOnSubmit = async (values) => {
    try {
      const action = await addAdminAsync(values);
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thêm tài khoản admin thành công",
        }),
      );
    } catch (error) {
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        }),
      );
    }
  };

  return (
    <section className={styles.section}>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <Paper className={styles.paper}>
                <Box>
                  <FastField
                    name="firstname"
                    component={InputField}
                    label="Tên"
                    placeholder="Tên"
                  />
                </Box>
                <Box>
                  <FastField
                    name="lastname"
                    component={InputField}
                    label="Họ"
                    placeholder="Họ"
                  />
                </Box>
                <Box>
                  <FastField
                    name="username"
                    component={InputField}
                    label="Admin name"
                    placeholder="adminname"
                  />
                </Box>
                <Box>
                  <FastField
                    name="email"
                    component={InputField}
                    label="Email"
                    placeholder="Email"
                  />
                </Box>
                <Box>
                  <FastField
                    name="password"
                    component={InputField}
                    label="Mật khẩu"
                    placeholder="Mật khẩu"
                  />
                </Box>
                <Button
                  className={styles.button}
                  type="submit"
                  variant="contained">
                  Xác nhận
                </Button>
              </Paper>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default AddAdmin;
