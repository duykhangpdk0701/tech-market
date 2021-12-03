import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AddressOrder from "./AddressOrder";
import style from "./Orders.module.scss";
import { useDispatch } from "react-redux";
import { fetchAdressAsync } from "../../app/addressSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const Orders = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const address = useSelector((state) => state.address.current);

  const initialValue = {
    address: "",
  };

  const validationSchema = Yup.object().shape({
    // address: Yup.string().required("Vui lòng tạo hoặc nhập một địa chỉ"),
  });

  const handleSubmit = async (value) => {
    console.log(value);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const action = await fetchAdressAsync({ userId });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchAddress();
  }, [dispatch, userId]);

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
        <Box>
          <AddressOrder
            address={address}
            initialValue={initialValue}
            handleSubmit={handleSubmit}
            validationSchema={validationSchema}
          />
        </Box>
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
