import { TextField, Typography, Button, Box } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartsAsync } from "../../app/cartsSlice";

import style from "./Cart.module.scss";
import ItemCart from "./ItemCart";

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.current) || [
    { quantity: 0, product: { price: 0 } },
  ];
  const user = useSelector((state) => state.auth.current) || "";
  const userId = user._id;
  let sum = 0;

  for (const item of carts) {
    sum += item.product.price * item.quantity;
  }

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchCartsAsync({ userId });
      const actionResult = dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch]);

  return (
    <section className={style.section}>
      <div className={style.container}>
        <Typography variant="h5">Giỏ hàng</Typography>
        <div className={style.content}>
          <Box
            sx={{
              boxShadow: 1,
              bgcolor: "background.paper",
              mb: 3,
              mr: 3,
              p: 2,
            }}
            className={style.main}>
            {carts.map((item) => {
              return <ItemCart cart={item} key={item._id} />;
            })}
          </Box>
          <aside className={style.aside}>
            <Box
              sx={{ boxShadow: 1, bgcolor: "background.paper", mb: 3, p: 2 }}
              className={style.promotion_container}>
              <Typography sx={{ mb: 1 }} variant="h6">
                Mã Khuyễn mãi
              </Typography>
              <TextField
                sx={{ mb: 1 }}
                size="small"
                id="outlined-basic"
                label="Mã khuyến mãi"
                variant="outlined"
                fullWidth
              />
              <Button className={style.apply_btn} variant="outlined">
                Áp dụng
              </Button>
            </Box>
            <Box
              sx={{ boxShadow: 1, bgcolor: "background.paper", mb: 3, p: 2 }}
              className={style.sumary_contianer}>
              <div className={style.temp_sum_cotainer}>
                <Typography variant="subtitle2">Tạm tính</Typography>
                <Typography>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(sum)}
                </Typography>
              </div>
              <div className={style.sum_contianer}>
                <Typography variant="h6">Tổng</Typography>
                <Typography color="primary" variant="h5">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(sum)}
                </Typography>
              </div>
            </Box>
            <Button
              fullWidth
              variant="contained"
              className={style.to_order_contianer}
              size="large">
              Tiến hành thanh toán
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
