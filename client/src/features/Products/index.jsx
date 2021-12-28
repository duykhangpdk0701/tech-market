import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/productsSlice";
import { Typography } from "@mui/material";
import Template from "./Template";
import { fetchAllBrands, fetchBrands } from "../../app/brandsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.current) || [];
  const brands = useSelector((state) => state.brands.current) || [];
  const [arrangePrice, setArrangePrice] = useState([1000000, 10000000]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchProducts({ brand: array });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };

    const fetchDataCategories = async () => {
      const action = await fetchAllBrands();
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };

    fetchData();
    fetchDataCategories();
  }, [dispatch, array]);

  const handleChangeCheckBox = (e, value) => {
    if (e.target.checked) {
      setArray([...array, e.target.value]);
    } else {
      setArray(array.filter((item) => item !== e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    const action = await fetchProducts({ arrangePrice, brand: array });
    const actionResult = await dispatch(action);
    unwrapResult(actionResult);
  };

  return (
    <Template
      items={products}
      brands={brands}
      componentName="Tất cả sản phẩm"
      arrangePrice={arrangePrice}
      setArrangePrice={setArrangePrice}
      handleSubmit={handleSubmit}
      setArray={setArray}
      handleChangeCheckBox={handleChangeCheckBox}
    />
  );
};

export default Products;
