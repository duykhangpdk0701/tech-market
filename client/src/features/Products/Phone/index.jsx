import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../../app/brandsSlice";
import { fetchPhones } from "../../../app/phonesSlice";
import { PHONE } from "../../../constants/category";
import Template from "../Template";

const Phone = () => {
  const dispatch = useDispatch();
  const phones = useSelector((state) => state.phones.current);
  const brands = useSelector((state) => state.brands.current);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchPhones();
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
  }, [dispatch]);

  return <Template items={phones} brands={brands} componentName="Điện thoại" />;
};

export default Phone;
