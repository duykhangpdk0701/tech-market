import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { fetchBrands } from "../../../app/brandsSlice";
import { fetchLaptops } from "../../../app/laptopsSlice";
import { LAPTOP } from "../../../constants/category";
import { useSelector, useDispatch } from "react-redux";
import Template from "../Template";

const Laptop = () => {
  const dispatch = useDispatch();
  const laptops = useSelector((state) => state.laptops.current);
  const brands = useSelector((state) => state.brands.current);
  const loadingLaptop = useSelector((state) => state.laptops.loading);
  const userId = localStorage.getItem("userId");
  const [arrangePrice, setArrangePrice] = useState([1000000, 10000000]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const fetchDataLaptop = async () => {
      const action = await fetchLaptops({ brand: array });
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
  }, [dispatch, array]);

  const handleSubmit = async (e) => {
    const action = await fetchLaptops({ arrangePrice, brand: array });
    const actionResult = await dispatch(action);
    unwrapResult(actionResult);
  };

  const handleChangeCheckBox = (e, value) => {
    if (e.target.checked) {
      setArray([...array, e.target.value]);
    } else {
      setArray(array.filter((item) => item !== e.target.value));
    }
  };

  return (
    <Template
      items={laptops}
      brands={brands}
      componentName="Laptop"
      isLoading={loadingLaptop}
      userId={userId}
      arrangePrice={arrangePrice}
      setArrangePrice={setArrangePrice}
      handleSubmit={handleSubmit}
      setArray={setArray}
      handleChangeCheckBox={handleChangeCheckBox}
    />
  );
};

export default Laptop;
