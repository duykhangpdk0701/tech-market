import {
  Paper,
  Box,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchBrandsAsync } from "../../app/brandsSlice";
import { fetchCategoriesAsync } from "../../app/categorySlice";
import { addProductAsync } from "../../app/productsSlice";
import { setSnackbar } from "../../app/snackBarSlice";
import { store } from "../../app/store";
import AutoField from "../../components/CustomField/AutoField";
import InputField from "../../components/CustomField/InputField";
import DropZone from "../../components/DropZone";
import style from "./AddProduct.module.scss";

const AddProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.current);
  const brands = useSelector((state) => state.brands.current);

  useEffect(() => {
    const fetchCategory = async () => {
      const action = await fetchCategoriesAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    const fetchBrand = async () => {
      const action = await fetchBrandsAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchCategory();
    fetchBrand();
  }, [dispatch]);

  const initialValue = {
    files: "",
    name: "",
    category: "",
    brand: "",
    description: "",
    quantity: "",
    price: "",
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    files: Yup.array().required(),
    name: Yup.string().required(),
    description: Yup.string().required(),
    quantity: Yup.number().required(),
    price: Yup.number().required(),
    // category: Yup.string().required()
    isActive: Yup.boolean().default(true),
  });

  const handleOnSubmit = async (values) => {
    try {
      const formData = new FormData();
      for (const file in values.files) {
        formData.append("files", values.files[file]);
      }
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("brand", values.brand);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);
      formData.append("price", values.price);
      formData.append("isActive", values.isActive);

      const action = await addProductAsync({ formData });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Không thành công",
        }),
      );
    } catch (error) {
      console.log(error);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Không thành công",
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
            <Form enctype="multipart/form-data">
              <Box className={style.outter_box}>
                <Paper elevation={0} className={style.paper}>
                  <Typography> Image</Typography>
                  <DropZone
                    values={formikProps.values}
                    setFieldValue={formikProps.setFieldValue}
                  />
                </Paper>
                <Paper elevation={0} className={style.paper}>
                  <Box>
                    <Typography variant="h5">Thông tin:</Typography>
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
                      placeholder="What's your photo category?"
                      options={categories}
                    />

                    <FastField
                      name="brand"
                      component={AutoField}
                      label="Brand:"
                      placeholder="What's your photo category?"
                      options={brands}
                    />
                  </Box>

                  <Box>
                    <FastField
                      name="quantity"
                      component={InputField}
                      label="Quantity:"
                      placholder="Quantity"
                    />

                    <FastField
                      name="price"
                      component={InputField}
                      label="Price:"
                      placholder="Price"
                    />
                  </Box>
                </Paper>

                <Paper elevation={0} className={style.paper}>
                  <Box>
                    <Typography>Description</Typography>
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

export default AddProduct;
