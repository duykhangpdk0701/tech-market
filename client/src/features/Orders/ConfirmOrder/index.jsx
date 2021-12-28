import React from "react";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../app/snackbarSlice";
import { addOrderAsync } from "../../../app/ordersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { clearCart } from "../../../app/cartsSlice";
import style from "./ConfirmOrder.module.scss";
import toPrice from "../../../helper/toPrice";

const ConfirmOrder = (props) => {
  const { handleBack, activeStep, setActiveStep, steps } = props;

  const order = useSelector((state) => state.order.current);

  const dispatch = useDispatch();
  const handleConfirm = async (e) => {
    try {
      const userId = localStorage.getItem("userId");
      const reqOrder = {
        products: order.carts.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
        user: userId,
        paymentMethod: order.paymentMethod,
        address: order.address,
      };

      const action = await addOrderAsync(reqOrder);
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      localStorage.removeItem("cart");
      dispatch(clearCart());
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Xử lý không thành công",
        }),
      );
    }
  };

  return (
    <>
      <Box className={style.container}>
        <Box className={style.right_content}>
          <Typography variant="h5">Đơn hàng của bạn</Typography>
          <TextField
            id="address"
            label="Địa chỉ"
            defaultValue={`${order.address.street} ${order.address.district} ${order.address.province}`}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2, mt: 2 }}
            fullWidth
          />

          <TextField
            id="payment"
            label="Phương thức thanh toán"
            defaultValue={`${order.paymentMethod}`}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2, mt: 2 }}
            fullWidth
          />

          <Typography variant="h5">Giỏ hàng</Typography>
          {order.carts.map((item) => (
            <Paper variant="outlined" className={style.cart}>
              <Box className={style.cart_img}></Box>
              <Box className={style.cart_container}>
                <Typography variant="subtitle2">{item.product.name}</Typography>
                <Typography variant="body2">
                  Quantity:{item.quantity}
                </Typography>
              </Box>
              <Typography variant="subtitle2" className={style.cart_price}>
                {toPrice(item.product.price)}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Box className={style.left_content}>
          <Typography sx={{ mb: 2 }} variant="h5">
            Tổng đơn hàng
          </Typography>
          <Box className={style.total_container}>
            <Typography>Tạm tính</Typography>
            <Typography>
              {toPrice(
                order.carts.reduce(
                  (a, b) => a + b.quantity * b.product.price,
                  0,
                ),
              )}
            </Typography>
          </Box>
          <Box className={style.total_container}>
            <Typography variant="h6">Tổng</Typography>
            <Typography variant="h6">
              {toPrice(
                order.carts.reduce(
                  (a, b) => a + b.quantity * b.product.price,
                  0,
                ),
              )}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleConfirm}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </>
  );
};

export default ConfirmOrder;
