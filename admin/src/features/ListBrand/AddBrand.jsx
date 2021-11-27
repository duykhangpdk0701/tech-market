import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddBrand.module.scss";
import * as Yup from "yup";
import { Paper, Box, Button } from "@mui/material";
import InputField from "../../components/CustomField/InputField";
import { store } from "../../app/store";
import { setSnackbar } from "../../app/snackBarSlice";
import { fetchCategoriesAsync } from "../../app/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addBrandAsync } from "../../app/brandsSlice";
import AutoField from "../../components/CustomField/AutoField";

const AddBrand = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.current);

  useEffect(() => {
    const fetchCategory = async () => {
      const action = await fetchCategoriesAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchCategory();
  }, []);

  const initialValue = {
    name: "",
    category: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Bạn cần nhập tên danh mục"),
    category: Yup.string().required("Bạn cần chọn danh mục"),
  });

  const handleOnSubmit = async (value) => {
    try {
      const { name, category } = value;
      const action = await addBrandAsync({ name, category });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thêm thương hiệu thành công",
        }),
      );
    } catch (error) {
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Thêm thương hiệu không thành công",
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
                      name="category"
                      component={AutoField}
                      label="Category:"
                      placholder="Category"
                      options={categories}
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

export default AddBrand;
