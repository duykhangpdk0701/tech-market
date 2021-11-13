import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { FastField, Formik } from "formik";
import prototype from "prop-types";
import { Avatar, Container, CssBaseline, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import { LockOutlined } from "@mui/icons-material";
import InputField from "../../../components/CustomField/InputField";

const FormLogin = (props) => {
  return (
    <Formik
      initialValues={props.initialValue}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}>
      {(formikProps) => {
        return (
          <ThemeProvider theme={props.theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <Box
                  onSubmit={formikProps.handleSubmit}
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}>
                  <FastField
                    name="username"
                    component={InputField}
                    label="Username"
                    placeholder="Enter your username"
                  />

                  <FastField
                    name="password"
                    component={InputField}
                    label="Password*"
                    placeholder="Enter your password"
                    type="password"
                  />

                  <LoadingButton
                    loading={props.LoadingButton}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </LoadingButton>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        );
      }}
    </Formik>
  );
};

FormLogin.prototype = {
  initialValue: prototype.object.isRequired,
  validationSchema: prototype.object.isRequired,
  theme: prototype.func.isRequired,
  onSubmit: prototype.func.isRequired,
};

export default FormLogin;
