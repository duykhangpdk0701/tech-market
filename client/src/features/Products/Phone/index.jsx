import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../../app/brandsSlice";
import { fetchLaptops } from "../../../app/laptopsSlice";
import { fetchPhones } from "../../../app/phonesSlice";
import { PHONE } from "../../../constants/category";
import Template from "../Template";

const Phone = () => {
  const dispatch = useDispatch();
  const phones = useSelector((state) => state.phones.current);
  const brands = useSelector((state) => state.brands.current);
  const userId = localStorage.getItem("userId");
  const [arrangePrice, setArrangePrice] = useState([1000000, 10000000]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchPhones({ brand: array });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    const fetchDataCategories = async () => {
      const action = await fetchBrands(PHONE);
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchData();
    fetchDataCategories();
  }, [dispatch, array]);

  const handleSubmit = async (e) => {
    const action = await fetchPhones({ arrangePrice, brand: array });
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
      items={phones}
      brands={brands}
      componentName="Điện thoại"
      arrangePrice={arrangePrice}
      setArrangePrice={setArrangePrice}
      handleSubmit={handleSubmit}
      setArray={setArray}
      handleChangeCheckBox={handleChangeCheckBox}
    />
  );
};

export default Phone;
