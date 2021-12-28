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
import Order from "../Orders";
import ListOrdersPending from "../Orders/ListOrdersPending";
import ListOrdersDelivering from "../Orders/ListOrdersDelivering";
import ListOrdersDelivered from "../Orders/ListOrdersDelivered";
import ListOrdersAbort from "../Orders/ListOrdersAbort";
import OrderDetails from "../Orders/OrdersDetails";
import ListAdmin from "../ListAdmin";
import GoodReceived from "../GoodReceived";
import Provider from "../Provider";
import GoodReceivedDetail from "../GoodReceived/GoodReceivedDetail";
import AddProvider from "../Provider/AddProvider";
import AddGoodReceived from "../GoodReceived/AddGoodReceived";
import ByDay from "../Analytics/ByDay";
import ByAmountOfDate from "../Analytics/ByAmountOfDate";
import UpdateBrand from "../ListBrand/UpdateBrand";
import UpdateProvider from "../Provider/UpdateProvider";
import UpdateProduct from "../ListProduct/UpdateProduct";
import AddAdmin from "../ListAdmin/AddAdmin";

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
            path={`${match.url}/product/update/:id`}
            component={UpdateProduct}
          />
          <Route path={`${match.url}/product/add`} component={AddProduct} />
          <Route path={`${match.url}/product`} component={ListProduct} />
          <Route path={`${match.url}/user/:id`} component={User} />
          <Route path={`${match.url}/user`} component={Users} />
          <Route path={`${match.url}/category/add`} component={AddCategory} />
          <Route path={`${match.url}/category`} component={ListCategory} />
          <Route
            path={`${match.url}/brand/update/:id`}
            component={UpdateBrand}
          />
          <Route path={`${match.url}/brand/add`} component={AddBrand} />
          <Route path={`${match.url}/brand`} component={ListBrand} />
          {/* analytics */}
          <Route
            path={`${match.url}/analytics/byamountofday`}
            component={ByAmountOfDate}
          />
          <Route path={`${match.url}/analytics/byday`} component={ByDay} />
          <Route path={`${match.url}/analytics`} component={Analytics} />
          {/* order  */}
          <Route
            path={`${match.url}/order/pending`}
            component={ListOrdersPending}
          />
          <Route
            path={`${match.url}/order/delivering`}
            component={ListOrdersDelivering}
          />
          <Route
            path={`${match.url}/order/delivered`}
            component={ListOrdersDelivered}
          />
          <Route
            path={`${match.url}/order/abort`}
            component={ListOrdersAbort}
          />
          <Route path={`${match.url}/order/:id`} component={OrderDetails} />
          <Route path={`${match.url}/order`} component={Order} />
          {/* admin */}
          <Route path={`${match.url}/admin/add`} component={AddAdmin} />
          <Route path={`${match.url}/admin`} component={ListAdmin} />
          {/* good received */}

          <Route
            path={`${match.url}/goodreceived/add`}
            component={AddGoodReceived}
          />
          <Route
            path={`${match.url}/goodreceived/:id`}
            component={GoodReceivedDetail}
          />
          <Route path={`${match.url}/goodreceived`} component={GoodReceived} />
          {/* provider */}
          <Route
            path={`${match.url}/provider/update/:id`}
            component={UpdateProvider}
          />
          <Route path={`${match.url}/provider/add`} component={AddProvider} />
          <Route path={`${match.url}/provider`} component={Provider} />
        </Switch>
      </div>
    </>
  );
};

export default Admin;
