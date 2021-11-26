import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
//import  component
import Home from "../../components/Home";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import ActionSnackBar from "../../components/ActionSnackBar";
//import feature
import Users from "../Users";
import User from "../User";
import ListProduct from "../ListProduct";
//import scss
import style from "./Admin.module.scss";
import AddProduct from "../ListProduct/AddProduct";

const Admin = () => {
  const match = useRouteMatch();

  return (
    <>
      <TopBar />
      <ActionSnackBar />
      <div className={style.container}>
        <SideBar />
        <Switch>
          <Route path={`${match.url}`} component={Home} exact />
          <Route
            path={`${match.url}/product/addproduct`}
            component={AddProduct}
          />
          <Route path={`${match.url}/product`} component={ListProduct} />
          <Route path={`${match.url}/user/:id`} component={User} />
          <Route path={`${match.url}/user`} component={Users} />
        </Switch>
      </div>
    </>
  );
};

export default Admin;
