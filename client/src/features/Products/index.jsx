import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../app/productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.current);

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchProduct();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchData();
  }, [dispatch]);

  return (
    <section>
      {products.map((product) => {
        return (
          <div>
            <h3>{product.name}</h3>
            <h3>{product.category.name}</h3>
            <h3>{product.brand.name}</h3>
          </div>
        );
      })}
    </section>
  );
};

export default Products;
