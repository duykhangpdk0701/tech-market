import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../../app/brandsSlice";
import { fetchLaptops } from "../../../app/laptopsSlice";
import { LAPTOP } from "../../../constants/category";
import Template from "../Template";

const Laptop = () => {
  const dispatch = useDispatch();
  const laptops = useSelector((state) => state.laptops.current);
  const brands = useSelector((state) => state.brands.current);
  const loadingLaptop = useSelector((state) => state.laptops.loading);
  const userId = useSelector((state) => state.auth.current).id;

  useEffect(() => {
    const fetchDataLaptop = async () => {
      const action = await fetchLaptops();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    const fetchDataCategories = async () => {
      const action = await fetchBrands(LAPTOP);
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchDataLaptop();
    fetchDataCategories();
  }, [dispatch]);

  const handleAddToCart = (e) => {
    console.log(e.target.loading);
    console.log("hello my name is Khang");
  };

  return (
    <Template
      items={laptops}
      brands={brands}
      componentName="Laptop"
      isLoading={loadingLaptop}
      userId={userId}
      handleAddToCart={handleAddToCart}
    />
  );
};

export default Laptop;
