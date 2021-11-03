import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import NavBar from "../../components/headers/NavBar";
import Products from "../Products";
import Laptop from "../Products/Laptop";

const Store = () => {
  const match = useRouteMatch();
  return (
    <>
      <NavBar />
      <Switch>
        <Route path={`${match.url}`} exact component={Products} />
        <Route path={`${match.url}/laptop`} exact component={Laptop} />
      </Switch>
    </>
  );
};

export default Store;
