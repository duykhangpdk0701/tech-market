import React, { useState } from "react";
import FormLogin from "./FormLogin";
//import redux
import { login, load } from "../../../app/authSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { createTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.auth.loading);
  const [errors, setErrors] = useState("");
  const theme = createTheme();

  const handleSubmit = async (values) => {
    try {
      const { username, password } = values;
      const action = await login({ username, password });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      await dispatch(load());
      if (queryString.parse(history.location.search).authTo === "true") {
        history.goBack();
      }
      history.push("/store");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const initialValue = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required"),
    password: Yup.string().required("Password is Required"),
  });

  return (
    <FormLogin
      onSubmit={handleSubmit}
      isLoading={loading}
      errors={errors}
      initialValue={initialValue}
      validationSchema={validationSchema}
      theme={theme}
    />
  );
};

export default Login;
