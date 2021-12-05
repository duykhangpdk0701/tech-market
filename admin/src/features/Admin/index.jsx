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
import AddCategory from "../ListCategory/AddCategory";
import ListCategory from "../ListCategory";
import ListBrand from "../ListBrand";
import AddBrand from "../ListBrand/AddBrand";
import Analytics from "../Analytics";

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
          <Route
            path={`${match.url}/category/add-category`}
            component={AddCategory}
          />
          <Route path={`${match.url}/category`} component={ListCategory} />
          <Route path={`${match.url}/brand/add-brand`} component={AddBrand} />
          <Route path={`${match.url}/brand`} component={ListBrand} />

          <Route path={`${match.url}/analytics`} component={Analytics} />
        </Switch>
      </div>
    </>
  );
};

export default Admin;
