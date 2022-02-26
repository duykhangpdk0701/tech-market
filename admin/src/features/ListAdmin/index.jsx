import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import style from "./ListAdmin.module.scss";
import Column from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminAsync } from "../../app/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomToolBar from "../../components/CustomToolBar";
import LoadingOverLay from "../../components/LoadingOverLay";
import DialogSetRole from "./DialogSetRole";

const ListAdmin = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.current) || [];
  const loading = useSelector((state) => state.admin.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await getAllAdminAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className={style.list_admin}>
      <DataGrid
        columns={Column}
        rows={admin}
        loading={loading}
        rowsPerPageOptions={[10]}
        pageSize={20}
        components={{
          Toolbar: CustomToolBar,
          LoadingOverlay: LoadingOverLay,
        }}
      />
      <DialogSetRole />
    </div>
  );
};

export default ListAdmin;
