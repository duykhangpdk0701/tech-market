import { DataGrid } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoodReceivedAsync } from "../../app/goodReceivedSlice";
import CustomToolBar from "../../components/CustomToolBar";
import LoadingOverLay from "../../components/LoadingOverLay";
import Columns from "./Columns";
import style from "./GoodReceived.module.scss";

const GoodReceived = () => {
  const dispatch = useDispatch();
  const goodsReceived =
    useSelector((state) => state.goodsReceived.current) || [];
  const loading = useSelector((state) => state.goodsReceived.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchGoodReceivedAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchData();
  }, [dispatch]);
  return (
    <div className={style.container}>
      <DataGrid
        columns={Columns}
        rows={goodsReceived}
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

export default GoodReceived;
