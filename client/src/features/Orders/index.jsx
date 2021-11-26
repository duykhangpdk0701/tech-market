import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";
import { FastField, Form, Formik } from "formik";
import React from "react";
import InputField from "../../custom-fields/InputFields";
import style from "./Orders.module.scss";
import * as Yup from "yup";

const Orders = () => {
  const initialValue = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Bạn phải nhập họ và tên"),
    phone: Yup.string().required("Bạn phải nhập Số điẹn thoại"),
    address: Yup.string().required("Bạn phải nhập địa chỉ"),
    city: Yup.string().required("Bạn phải nhập thàng phố"),
    district: Yup.string().required("Bạn phải nhập quận"),
  });

  const handleSubmit = (e) => {};

  return (
    <section className={style.section}>
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: "background.paper",
          p: 5,
        }}
        className={style.address_contnent}>
        <Typography variant="h5" className={style.title}>
          TaoDao.LOLI
        </Typography>
        <Typography>Thông tin giao hàng</Typography>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {(formikProps) => {
            return (
              <Form>
                <FastField
                  name="name"
                  component={InputField}
                  label="Họ và tên"
                />
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <FastField
                      name="email"
                      component={InputField}
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FastField
                      name="phone"
                      component={InputField}
                      label="Phone"
                    />
                  </Grid>
                </Grid>
                <FastField
                  name="address"
                  component={InputField}
                  label="Địa chỉ"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FastField
                      name="city"
                      component={InputField}
                      label="City:"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FastField
                      name="district"
                      component={InputField}
                      label="District:"
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <LoadingButton variant="contained" type="submit">
                    Tiếp tục với phương thức thanh toán
                  </LoadingButton>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Box>
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: "background.paper",
          p: 2,
        }}
        className={style.cart_content}></Box>
    </section>
  );
};

export default Orders;
