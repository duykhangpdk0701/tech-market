import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../app/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.current) || {};
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchProduct({ id });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product._id}</h1>
    </div>
  );
};

export default Product;
