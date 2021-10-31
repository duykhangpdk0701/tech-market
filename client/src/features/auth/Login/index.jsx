import React from "react";
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

  const handleSubmit = async (values) => {
    try {
      const { username, password } = values;
      const action = login({ username, password });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      history.push("/store");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.img_container}>
          <img className={style.img} src={loginBanner} alt="" />
        </div>
        <div className={style.form_container}>
          <FormLogin onSubmit={handleSubmit} isLoading={loading} />
        </div>
      </div>
    </section>
  );
};

export default Login;
