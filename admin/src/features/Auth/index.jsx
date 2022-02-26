import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Login from "./Login";

const Auth = () => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.url}`} exact>
          <Redirect to={`${match.url}/login`} />
        </Route>
        <Route path={`${match.url}/login`} component={Login} />
      </Switch>
    </>
  );
};

export default Auth;
