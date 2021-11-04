import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
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
            <Card className={style.item_wrapper}>
              <CardImg src="https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/23/637232326768418337_lenovo-ideapad-L340-den-2.png" />
              <CardBody>
                <CardTitle tag="h5">{laptop.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {laptop.brand.name}
                </CardSubtitle>
                <CardText>{laptop.description}</CardText>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Laptop;
