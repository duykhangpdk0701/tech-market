import { DataGrid } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProviderAsync } from "../../app/providersSlice";
import CustomToolBar from "../../components/CustomToolBar";
import LoadingOverLay from "../../components/LoadingOverLay";
import Columns from "./Columns";
import style from "./Provider.module.scss";

const Provider = () => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers.current) || [];
  const loading = useSelector((state) => state.providers.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await getAllProviderAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={style.container}>
      <DataGrid
        columns={Columns}
        rows={providers}
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

export default Provider;
