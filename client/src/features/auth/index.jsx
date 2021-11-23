import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../../app/authSlice";
//import feature
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  if (current) {
    return <Redirect to="/store" />;
  } else {
    return (
      <Switch>
        <Route path={`${match.url}`} exact>
          <Redirect to={`${match.url}/login`} />
        </Route>
        <Route path={`${match.url}/login`} component={Login} />
        <Route path={`${match.url}/register`} component={Register} />
      </Switch>
    );
  }
};

export default Auth;
