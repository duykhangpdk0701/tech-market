import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import Products from "../Products";

const Store = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}`} exact component={Products} />
    </Switch>
  );
};

export default Store;
