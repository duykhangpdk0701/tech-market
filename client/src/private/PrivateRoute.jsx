import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const takeRest = { ...rest };

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <>
            {history.push(takeRest.path)}
            <Redirect to="/auth/login?authTo=true" />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
