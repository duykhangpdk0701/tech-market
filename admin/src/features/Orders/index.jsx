import { DataGrid } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersAsync } from "../../app/orderSlice";
import CustomToolBar from "../../components/CustomToolBar";
import LoadingOverLay from "../../components/LoadingOverLay";
import Columns from "./Columns";
import DialogSetStatus from "./DialogSetStaus";
import style from "./Orders.module.scss";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.current) || [];
  const loading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchOrdersAsync();
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={style.orders}>
      <DataGrid
        columns={Columns}
        rows={orders}
        loading={loading}
        rowsPerPageOptions={[10]}
        pageSize={20}
        components={{
          Toolbar: CustomToolBar,
          LoadingOverlay: LoadingOverLay,
        }}
      />
      <DialogSetStatus />
    </div>
  );
};

export default Orders;
