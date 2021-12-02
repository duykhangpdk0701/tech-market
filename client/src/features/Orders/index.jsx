import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import style from "./Orders.module.scss";

const Orders = () => {
  const handleSubmit = (e) => {};

  return (
    <section className={style.section}>
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: "background.paper",
          p: 5,
        }}
        className={style.address_contnent}>
        <Typography variant="h5" className={style.title}>
          TaoDao.LOLI
        </Typography>
        <Typography>Chọn địa chỉ giao hàng</Typography>
        <Box></Box>
      </Box>
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: "background.paper",
          p: 2,
        }}
        className={style.cart_content}></Box>
    </section>
  );
};

export default Orders;
