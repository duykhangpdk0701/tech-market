import { Formik, Form, FastField } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../custom-fields/InputFields";
import style from "./FormLogin.module.scss";
import loginBanner from "../../../assets/loginBanner.svg";
import { LoadingButton } from "@mui/lab";
import { Avatar, Typography, Alert } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Grid } from "@mui/material";

const FormLogin = (props) => {
  return (
    <ThemeProvider theme={props.theme}>
      <CssBaseline />
      <section className={style.section}>
        <div className={style.container}>
          <div className={style.img_container}>
            <img className={style.img} src={loginBanner} alt="" />
          </div>
          <div className={style.form_container}>
            <Formik
              initialValues={props.initialValue}
              validationSchema={props.validationSchema}
              onSubmit={props.onSubmit}>
              {(formikProps) => {
                return (
                  <Form className={style.form}>
                    <div className={style.title_container}>
                      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlined />
                      </Avatar>
                      <Typography tag="h1" variant="h5" className={style.title}>
                        Login
                      </Typography>
                    </div>
                    {props.errors && (
                      <Alert severity="error">{props.errors}</Alert>
                    )}

                    <FastField
                      name="username"
                      component={InputField}
                      label="Username:"
                      placeholder="Enter your username"
                      bsSize="lg"
                    />

                    <FastField
                      name="password"
                      component={InputField}
                      label="Password:"
                      type="password"
                      placeholder="Enter your password"
                      bsSize="lg"
                    />
                    <Grid container direction="row" justifyContent="flex-end">
                      <Grid item>
                        <Link to="/auth/forgot-password">Forgot password</Link>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item>
                        <span className={style.to_register}>
                          Don't have an account{" "}
                          <Link to="/auth/register">Register</Link>
                        </span>
                      </Grid>
                    </Grid>
                    <div className={style.btn_submit}>
                      <LoadingButton
                        loading={props.isLoading}
                        type="submit"
                        size="large"
                        variant="contained"
                        fullWidth>
                        Submit
                      </LoadingButton>
                    </div>
                    <div
                      data-width="100%"
                      class="g-signin2"
                      data-onsuccess="onSignIn"></div>
                    <div
                      class="fb-login-button"
                      data-width=""
                      data-size="large"
                      data-button-type="login_with"
                      data-layout="default"
                      data-auto-logout-link="false"
                      data-use-continue-as="false"></div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default FormLogin;
