import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "../../components/Home";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import User from "../User";
import ListProduct from "../ListProduct";
//import scss
import style from "./Admin.module.scss";

const Admin = () => {
  const match = useRouteMatch();

  return (
    <>
      <TopBar />
      <div className={style.container}>
        <SideBar />
        <Switch>
          <Route path={`${match.url}`} component={Home} exact />
          <Route path={`${match.url}/product`} component={ListProduct} />
          <Route path={`${match.url}/user`} component={User} />
        </Switch>
      </div>
    </>
  );
};

export default Admin;
