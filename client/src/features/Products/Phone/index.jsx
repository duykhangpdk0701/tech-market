import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchLaptops } from "../../../app/laptopsSlice";
import Template from "../Template";

const Phone = () => {
  const dispatch = useDispatch();
  const laptops = useSelector((state) => state.laptops.current);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchLaptops();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return <Template items={laptops} componentName="Điện thoại" />;
};

export default Phone;
