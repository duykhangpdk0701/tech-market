import { Formik, Form, FastField } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { Alert, Col, FormGroup, Row, Spinner } from "reactstrap";
import { Button } from "@mui/material";
import InputField from "../../../custom-fields/InputFields";
import * as Yup from "yup";
//import style
import style from "./FormRegister.module.scss";

const FormRegister = (props) => {
  const initialValue = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
    username: Yup.string().required("Username is Required"),
    email: Yup.string()
      .email("Email không phù hợp")
      .required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Mật khẩu phải ít nhất 8 ký tự "),
    confirmPassword: Yup.string().test(
      "password-match",
      "Password không khớp",
      function (value) {
        return this.parent.password === value;
      },
    ),
  });

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}>
      {(formikProps) => {
        // console.log(formikProps.values);
        return (
          <Form className={style.form}>
            <div className={style.title_container}>
              <h1 className={style.title}>Register</h1>
            </div>

            {props.errors && (
              <FormGroup>
                <Alert color="danger">{props.errors}</Alert>
              </FormGroup>
            )}

            <Row>
              <Col>
                <FastField
                  name="firstname"
                  component={InputField}
                  label="First Name:"
                  placeholder="Enter your First Name"
                  bsSize="lg"
                />
              </Col>
              <Col>
                <FastField
                  name="lastname"
                  component={InputField}
                  label="Last Name:"
                  placeholder="Enter your First Name"
                  bsSize="lg"
                />
              </Col>
            </Row>
            <FastField
              name="username"
              component={InputField}
              label="Username:"
              placeholder="Enter your username"
              bsSize="lg"
            />

            <FastField
              name="email"
              component={InputField}
              label="Email:"
              placeholder="Enter your email"
              bsSize="lg"
            />

            <FastField
              name="password"
              component={InputField}
              label="Password:"
              placeholder="Enter your password"
              type="password"
              bsSize="lg"
            />

            <FastField
              name="confirmPassword"
              component={InputField}
              label="Confirm password:"
              placeholder="Confirm password"
              type="password"
              bsSize="lg"
            />

            <div className={style.submit_container}>
              <FormGroup>
                <div className={style.to_register}>
                  Already have an account <Link to="/auth/login">Login</Link>
                </div>

                {props.isLoading ? (
                  <Button
                    color="primary"
                    className={style.submit_btn}
                    size="lg"
                    block
                    type="submit"
                    disabled>
                    <Spinner className={style.submit_spinner}>
                      Loading...
                    </Spinner>
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={style.submit_btn}
                    type="submit">
                    Submit
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

export default FormRegister;
