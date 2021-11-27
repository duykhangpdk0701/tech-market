import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import style from "./UpdateCategory.module.scss";
import * as Yup from "yup";
import { Paper, Box, Button } from "@mui/material";
import InputField from "../../components/CustomField/InputField";
import { store } from "../../app/store";
import { setSnackbar } from "../../app/snackBarSlice";
import { addCategoryAsync } from "../../app/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";

const UpdateCategory = () => {
  const dispatcth = useDispatch();

  const initialValue = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Bạn phẩm nhập tên danh mục"),
    description: Yup.string(),
  });

  const handleOnSubmit = async (value) => {
    try {
      const { name, description } = value;
      const action = await addCategoryAsync({ name, description });
      const actionResult = await dispatcth(action);
      await unwrapResult(actionResult);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Cập nhật danh mục thành công",
        }),
      );
    } catch (error) {
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Cập nhật danh mục không thành công",
        }),
      );
    }
  };

  return (
    <section className={style.section}>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        {(formikProps) => {
          return (
            <Form>
              <Box>
                <Paper>
                  <Box>
                    <FastField
                      name="name"
                      component={InputField}
                      label="Name:"
                      placholder="Name"
                    />
                  </Box>
                  <Box>
                    <FastField
                      name="description"
                      component={InputField}
                      label="description"
                      multiline
                      placholder="description"
                    />
                  </Box>
                </Paper>

                <Paper elevation={0} className={style.paper}>
                  <Box>
                    <Button type="submit" variant="contained">
                      Xác nhận
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default UpdateCategory;
