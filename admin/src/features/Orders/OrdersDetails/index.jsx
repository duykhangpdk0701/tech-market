import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import style from "./OrdersDetails.module.scss";

const OrderDetails = () => {
  const { id } = useParams();
  return (
    <div className={style.order_details}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        {[
          <Link key="1" to="/admin">
            Home
          </Link>,
          <Link key="2" to="/admin/order">
            Order
          </Link>,
          <Typography key="3">{id}</Typography>,
        ]}
      </Breadcrumbs>
    </div>
  );
};

export default OrderDetails;
