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
import InputField from "../../components/CustomField/InputField";
import DropZone from "../../components/DropZone";
import style from "./AddProduct.module.scss";

const AddProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.current) || [];
  const brands = useSelector((state) => state.brands.current) || [];

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
    isActive: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    category: Yup.string().required(),
    brand: Yup.string().required(),
    description: Yup.string().required(),
    quantity: Yup.string().required(),
    price: Yup.number().required(),
    isActive: Yup.boolean().default(true),
  });

  const handleOnSubmit = async (values) => {
    console.log(values);
    console.log("hello my name is Khang");
  };

  return (
    <section className={style.section}>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        {(formikProps) => {
          return (
            <Form onSubmit={handleOnSubmit} noValidate>
              <Box className={style.outter_box}>
                <Paper elevation={0} className={style.paper}>
                  <Typography> Image </Typography>
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
                    <Autocomplete
                      id="category"
                      options={categories}
                      autoHighlight
                      getOptionLabel={(options) => options.name}
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Categories"
                          inputProps={{ ...params.inputProps }}
                        />
                      )}
                    />

                    <Autocomplete
                      id="brand"
                      options={brands}
                      autoHighlight
                      getOptionLabel={(options) => options.name}
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Brands" />
                      )}
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
