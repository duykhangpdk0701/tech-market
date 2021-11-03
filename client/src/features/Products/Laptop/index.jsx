import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaptops } from "../../../app/laptopsSlice";
//import style
import style from "./Laptop.module.scss";

const Laptop = () => {
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

  return (
    <section className={style.section}>
      <div className={style.content_wrapper}>
        <div>
          <h3>Laptop</h3>
        </div>
        <div className={style.content}>
          {laptops.map((laptop) => (
            <div className={style.item_wrapper}>
              <h3>{laptop.name}</h3>
              <h3>{laptop.category.name}</h3>
              <h3>{laptop.brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Laptop;
