import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import NavBar from "../../components/headers/NavBar";
import Products from "../Products";
import Laptop from "../Products/Laptop";
import Phone from "../Products/Phone";
import Product from "../Product";
import ActionSnackBar from "../../components/ActionSnackbar";

const Store = () => {
  const match = useRouteMatch();
  return (
    <>
      <NavBar />
      <ActionSnackBar />
      <Switch>
        <Route path={`${match.url}`} exact component={Products} />
        <Route path={`${match.url}/laptop`} component={Laptop} />
        <Route path={`${match.url}/phone`} component={Phone} />
        <Route path={`${match.url}/product/:id`} component={Product} exact />
      </Switch>
    </>
  );
};

export default Store;
