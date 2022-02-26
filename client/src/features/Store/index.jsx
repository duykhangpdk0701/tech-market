import React, { useEffect } from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import NavBar from "../../components/headers/NavBar";
import Products from "../Products";
import Laptop from "../Products/Laptop";
import Phone from "../Products/Phone";
import Product from "../Product";
import Cart from "../Cart";
import ActionSnackBar from "../../components/ActionSnackbar";
import { useDispatch } from "react-redux";
import { load } from "../../app/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Orders from "../Orders";
import PrivateRoute from "../../private/PrivateRoute";
import Ordered from "../Ordered";
import OrderDetail from "../OrderDetail";

const Store = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    const autoAuth = async () => {
      const action = await load();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    autoAuth();
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <ActionSnackBar />
      <Switch>
        <Route path={`${match.url}`} exact component={Products} />
        <Route path={`${match.url}/laptop`} component={Laptop} />
        <Route path={`${match.url}/phone`} component={Phone} />
        <Route path={`${match.url}/cart`} component={Cart} />
        <Route path={`${match.url}/product/:id`} component={Product} exact />
        <Route path={`${match.url}/ordered/:id`} component={OrderDetail} />
        <Route path={`${match.url}/ordered`} component={Ordered} />
        <PrivateRoute path={`${match.url}/order`} component={Orders} />
      </Switch>
    </>
  );
};

export default Store;
