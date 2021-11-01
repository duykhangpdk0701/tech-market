import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import NavBar from "../../components/headers/NavBar";
import Products from "../Products";

const Store = () => {
  const match = useRouteMatch();
  return (
    <>
      <NavBar />
      <Switch>
        <Route path={`${match.url}`} exact component={Products} />
      </Switch>
    </>
  );
};

export default Store;
