import { Formik, Form, FastField } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Button } from "reactstrap";
import InputField from "../../../custom-fields/InputFields";
import style from "./Form.module.scss";

const Login = () => {
  const initialValue = {
    username: "",
    password: "",
  };

  return (
    <>
      <Formik initialValues={initialValue}>
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          console.log({ values, errors, touched });
          return (
            <Form className={style.form}>
              <FormGroup>
                <h1 className={style.title}>Login</h1>
              </FormGroup>
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

                  <Button
                    color="primary"
                    className={style.submit_btn}
                    size="lg"
                    block>
                    Login
                  </Button>
                </FormGroup>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
