import React from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import css
import "./App.scss";
import { getLocalCart } from "./app/cartsSlice";
import Auth from "./features/auth";
import Store from "./features/Store";

const App = () => {
  const dispatch = useDispatch();
  dispatch(getLocalCart());

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={`/`} exact>
            <Redirect to={`/store`} />
          </Route>
          <Route path="/auth" component={Auth} />
          <Route path="/store" component={Store} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
