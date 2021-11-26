import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../../app/productsSlice";
import CustomToolBar from "../../components/CustomToolBar";
import LoadingOverLay from "../../components/LoadingOverLay";
import Columns from "./Columns";
import style from "./ListProduct.module.scss";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.current) || [];
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchProductsAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={style.list_product}>
      <Button>Add Product</Button>
      <DataGrid
        columns={Columns}
        rows={products}
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

export default Product;
