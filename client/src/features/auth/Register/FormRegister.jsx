import { Formik, Form, FastField } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, FormGroup, Row } from "reactstrap";
import InputField from "../../../custom-fields/InputFields";
//import style
import style from "./FormRegister.module.scss";

const FormRegister = () => {
  const initialValue = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik initialValues={initialValue}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });
        return (
          <Form className={style.form}>
            <div className={style.title_container}>
              <h1 className={style.title}>Register</h1>
            </div>
            <Row>
              <Col>
                <FastField
                  name="firstName"
                  component={InputField}
                  label="First Name:"
                  placeholder="Enter your First Name"
                  bsSize="lg"
                />
              </Col>
              <Col>
                <FastField
                  name="lastName"
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
  );
};

export default FormRegister;
