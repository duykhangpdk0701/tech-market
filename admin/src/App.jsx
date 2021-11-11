import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Admin from "./features/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/admin" />
          </Route>
          <Route path="/auth" />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
