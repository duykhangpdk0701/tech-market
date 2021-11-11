import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Login from "./Login";

const Auth = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default Auth;
