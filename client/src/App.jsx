import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Auth from "./features/auth";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={`/`} exact>
            <Redirect to={`/auth`} />
          </Route>
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
