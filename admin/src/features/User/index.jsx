import React, { useEffect } from "react";
//import redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAsync } from "../../app/userSlice";
//import style
import style from "./User.module.scss";
//import material UI
import { DataGrid } from "@mui/x-data-grid";
import LoadingOverLay from "../../components/LoadingOverLay";
import CustomToolBar from "../../components/CustomToolBar";
import Columns from "./Columns";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.current) || [];
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchUsersAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={style.user}>
      <DataGrid
        columns={Columns}
        rows={users}
        pageSize={20}
        loading={loading}
        rowsPerPageOptions={[20]}
        components={{ Toolbar: CustomToolBar, LoadingOverlay: LoadingOverLay }}
      />
    </div>
  );
};

export default User;
