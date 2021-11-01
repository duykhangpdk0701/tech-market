import { Formik, Form, FastField } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Button, Spinner, Alert } from "reactstrap";
import InputField from "../../../custom-fields/InputFields";
import style from "./FormLogin.module.scss";
import * as Yup from "yup";

const FormLogin = (props) => {
  const initialValue = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}>
      {(formikProps) => {
        return (
          <Form className={style.form}>
            <div className={style.title_container}>
              <h1 className={style.title}>Login</h1>
            </div>
            {props.errors && (
              <FormGroup>
                <Alert color="danger">{props.errors}</Alert>
              </FormGroup>
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

            <FormGroup className={style.forgot_password_container}>
              <Link to="/auth/forgot-password">Forgot password</Link>
            </FormGroup>

            <div className={style.submit_container}>
              <FormGroup>
                <div className={style.to_register}>
                  Don't have an account{" "}
                  <Link to="/auth/register">Register</Link>
                </div>

                {props.isLoading ? (
                  <Button
                    color="primary"
                    className={style.submit_btn}
                    size="lg"
                    block
                    type="submit"
                    disabled>
                    <Spinner>Loading...</Spinner>
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className={style.submit_btn}
                    size="lg"
                    block
                    type="submit">
                    Login
                  </Button>
                )}
              </FormGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;
