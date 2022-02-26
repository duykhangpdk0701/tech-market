import { DataGrid } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../app/categorySlice";
import CustomToolBar from "../../components/CustomToolBar";
import LoadingOverLay from "../../components/LoadingOverLay";
import Columns from "./Columns";
import style from "./ListCategory.module.scss";

const ListCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.current) || [];
  const loading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchCategoriesAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={style.list_cagetory}>
      <DataGrid
        columns={Columns}
        rows={categories}
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

export default ListCategory;
