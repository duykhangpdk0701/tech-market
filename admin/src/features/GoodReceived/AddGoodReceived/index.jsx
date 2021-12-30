import {
  Autocomplete,
  Box,
  Button,
  Card,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProviderAsync } from "../../../app/providersSlice";
import { fetchProductsAsync } from "../../../app/productsSlice";
import { store } from "../../../app/store";
import { setSnackbar } from "../../../app/snackBarSlice";
import { addGoodReceivedAsync } from "../../../app/goodReceivedSlice";
import styles from "./Add.module.scss";
import ItemAddGoodReceived from "./ItemAddGoodReceived";

const AddGoodReceived = () => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers.current) || [];
  const products = useSelector((state) => state.products.current) || [];
  const [providerValue, setProviderValue] = useState("");
  const [productValue, setProductValue] = useState({});
  const [productQuantity, setProductQuantity] = useState(0);
  const [arrProductValue, setArrProductValue] = useState([]);

  useEffect(() => {
    const fetchProvider = async () => {
      const action = getAllProviderAsync();
      const actionResult = dispatch(action);
      await unwrapResult(actionResult);
    };

    const fetchProduct = async () => {
      const action = fetchProductsAsync();
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };

    fetchProvider();
    fetchProduct();
  }, [dispatch]);

  const handleAdd = (e) => {
    for (const item of arrProductValue) {
      if (item._id === productValue._id) return;
    }
    setArrProductValue((previousState) => [
      ...previousState,
      {
        product: productValue._id,
        name: productValue.name,
        quantity: productQuantity,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    const adminId = localStorage.getItem("adminId");
    console.log({ adminId, arrProductValue, providerValue });
    try {
      const action = await addGoodReceivedAsync({
        admin: adminId,
        goodReceivedDetail: arrProductValue,
        provider: providerValue,
      });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thêm thành công",
        }),
      );
    } catch (error) {
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Không thành công",
        }),
      );
    }
  };

  return (
    <div className={styles.section}>
      <Box className={styles.box}>
        <Card className={styles.card}>
          <Typography variant="h5">Nhà cung cấp :</Typography>
          <Autocomplete
            freeSolo
            options={providers}
            onChange={(event, newValue) => {
              if (newValue) setProviderValue(newValue._id);
            }}
            renderOption={(props, option) => (
              <li {...props}>
                <Typography>{option.name}</Typography>
              </li>
            )}
            getOptionLabel={(option) => option.name || ""}
            renderInput={(params) => <TextField {...params} label="Tìm kiếm" />}
            className={styles.input}
          />
          <Typography variant="h5">Sản phẩm :</Typography>
          <Autocomplete
            freeSolo
            options={products}
            onChange={(event, newValue) => {
              setProductValue(newValue);
            }}
            renderOption={(props, option) => (
              <li {...props}>
                <Typography>{option.name}</Typography>
              </li>
            )}
            getOptionLabel={(option) => option.name || ""}
            renderInput={(params) => <TextField {...params} label="Tìm kiếm" />}
            className={styles.input}
          />
          <TextField
            onChange={(e) => setProductQuantity(e.target.value)}
            label="Số lượng"
            type="number"
            className={styles.input}
          />
          <Button
            variant="contained"
            className={styles.button}
            onClick={handleAdd}>
            Thêm
          </Button>
        </Card>
      </Box>
      <Box className={styles.box}>
        <Card className={styles.card}>
          <Typography variant="h5">Danh sách sản phẩm nhập hàng</Typography>
          {arrProductValue &&
            arrProductValue.map((item) => {
              return (
                <ItemAddGoodReceived
                  key={item._id}
                  id={item.product}
                  quantity={item.quantity}
                />
              );
            })}
          <Button
            variant="contained"
            className={styles.button}
            onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </Box>
    </div>
  );
};

export default AddGoodReceived;
