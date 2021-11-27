import React, { useEffect } from "react";
import style from "./ListBrand.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsAsync } from "../../app/brandsSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import CustomToolBar from "../../components/CustomToolBar";
import LoadingOverLay from "../../components/LoadingOverLay";
import Columns from "./Columns";
import { unwrapResult } from "@reduxjs/toolkit";

const Brand = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands.current) || [];
  const loading = useSelector((state) => state.brands.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchBrandsAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={style.list_brand}>
      <Button>Add Product</Button>
      <DataGrid
        columns={Columns}
        rows={brands}
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

export default Brand;
