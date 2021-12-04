import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../app/snackbarSlice";
import { addOrderAsync } from "../../../app/ordersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { clearCart } from "../../../app/cartsSlice";

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
      <Box>
        <Typography>confirm </Typography>
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
