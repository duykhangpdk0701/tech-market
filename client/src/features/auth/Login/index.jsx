import React, { useState } from "react";
import FormLogin from "./FormLogin";
//import style
import style from "./Login.module.scss";
//import redux
import { login } from "../../../app/authSlice";
import { useDispatch } from "react-redux";

import loginBanner from "../../../assets/loginBanner.svg";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.auth.loading);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (values) => {
    try {
      const { username, password } = values;
      const action = await login({ username, password });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      history.push("/store");
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.img_container}>
          <img className={style.img} src={loginBanner} alt="" />
        </div>
        <div className={style.form_container}>
          <FormLogin
            onSubmit={handleSubmit}
            isLoading={loading}
            errors={errors}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
