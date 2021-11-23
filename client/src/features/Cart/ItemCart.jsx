import { LoadingButton } from "@mui/lab";
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  CircularProgress,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartAsync, removeCartAsync } from "../../app/cartsSlice";
import { setSnackbar } from "../../app/snackbarSlice";
import style from "./ItemCart.module.scss";

const ItemCart = (props) => {
  const { cart } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleIncreaseAmount = async (e) => {
    try {
      setLoading(true);
      const action = await addToCartAsync({
        userId: cart.user,
        productId: cart.product._id,
        quantity: 1,
      });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      await setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "thêm số lượng sản phẩm trong giỏ hàng thành công!",
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage:
            "Đã có sự cố trong việc cập nhật giỏ hàng, xin vui lòng thử lại sau!",
        }),
      );
    }
  };

  const handleDecreaseAmount = async (e) => {
    try {
      if (cart.quantity <= 1) {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "warning",
            snackbarMessage: "Sản phẩm không thể nhỏ hơn hoặc bằng 1!",
          }),
        );
        return;
      }
      setLoading(true);
      const action = await addToCartAsync({
        userId: cart.user,
        productId: cart.product._id,
        quantity: -1,
      });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      await setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Trừ số lượng sản phẩm trong giỏ hàng thành công!",
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage:
            "Đã có sự cố trong việc cập nhật giỏ hàng, xin vui lòng thử lại sau!",
        }),
      );
    }
  };

  const handleRemoveCart = async (e) => {
    try {
      setLoading(true);
      const action = await removeCartAsync({ cartId: cart._id });
      const acionResult = await dispatch(action);
      await unwrapResult(acionResult);
      setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Xoá sản phẩm trong giỏ hàng thành công!",
        }),
      );
    } catch (error) {
      setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage:
            "Đã có sự cố trong việc cập nhật giỏ hàng, xin vui lòng thử lại sau!",
        }),
      );
    }
  };

  return (
    <Box mx={{ p: 3 }} className={style.container}>
      <Box className={style.img_contianer}></Box>
      <Box className={style.name_container}>
        <Typography>{cart.product.name}</Typography>
        <LoadingButton
          loading={loading}
          size="small"
          disabled={loading}
          onClick={handleRemoveCart}>
          Xoá
        </LoadingButton>
      </Box>
      <Box className={style.price_container}>
        <Typography variant="h6">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(cart.product.price * cart.quantity)}
        </Typography>
      </Box>
      <Box className={style.amount_container}>
        <ButtonGroup>
          <Button disabled={loading} onClick={handleDecreaseAmount}>
            -
          </Button>
          <TextField
            disabled={loading}
            value={cart.quantity}
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <Button disabled={loading} onClick={handleIncreaseAmount}>
            +
          </Button>
        </ButtonGroup>

        {loading && (
          <CircularProgress size={22} className={style.progress_loading} />
        )}
      </Box>
    </Box>
  );
};

export default ItemCart;
