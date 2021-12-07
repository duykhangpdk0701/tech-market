import { DataGrid } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersAsync } from "../../../app/orderSlice";
import CustomToolBar from "../../../components/CustomToolBar";
import LoadingOverLay from "../../../components/LoadingOverLay";
import Columns from ".././Columns";
import style from ".././Orders.module.scss";

const ListOrdersDelivering = () => {
  const distpatch = useDispatch();
  const orders = useSelector((state) => state.orders.current) || [];
  const loading = useSelector((state) => state.orders.loading);
  setTimeout(() => {
    console.log(orders);
  }, 3000);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchOrdersAsync();
      const actionResult = await distpatch(action);
      await unwrapResult(actionResult);
    };
    fetchData();
  }, []);

  return (
    <div className={style.orders}>
      <DataGrid
        columns={Columns}
        rows={orders.filter((item) => item.status === 2)}
        loading={loading}
        rowsPerPageOptions={[10]}
        pageSize={20}
        components={{
          Toolbar: CustomToolBar,
          LoadingOverlay: LoadingOverLay,
        }}
      />
    </div>
  );
};

export default ListOrdersDelivering;
