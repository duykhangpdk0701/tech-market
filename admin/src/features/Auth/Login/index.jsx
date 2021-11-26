import React from "react";
import FormLogin from "./FormLogin";
import * as Yup from "yup";
import { createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync } from "../../../app/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.auth.loading);
  const admin = useSelector((state) => state.auth.current);

  const initialValue = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const theme = createTheme();

  const handleOnSubmit = async (values) => {
    try {
      const { username, password } = values;
      const action = await loginAsync({ username, password });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      history.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormLogin
        initialValue={initialValue}
        validationSchema={validationSchema}
        theme={theme}
        onSubmit={handleOnSubmit}
        loadingBtn={loading}
      />
    </>
  );
};

export default Login;
