import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../../app/authSlice";
import FormRegister from "./FormRegister";

//import style
import style from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.auth.loading);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (values) => {
    try {
      // eslint-disable-next-line
      const { firstname, lastname, username, email, password } = values;
      const action = register({
        firstname,
        lastname,
        username,
        email,
        password,
      });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      history.push("/auht/login");
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.form_container}>
          <FormRegister
            onSubmit={handleSubmit}
            isLoading={loading}
            errors={errors}
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
