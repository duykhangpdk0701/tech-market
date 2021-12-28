import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.scss";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import brandsApi from "../../api/brandApi";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import DropZone from "../../components/DropZone";
import { fetchCategoriesAsync } from "../../app/categorySlice";
import productsApi from "../../api/productApi";
import { fetchBrandsAsync } from "../../app/brandsSlice";
import { addProductAsync, updateProductAsync } from "../../app/productsSlice";
import { store } from "../../app/store";
import { setSnackbar } from "../../app/snackBarSlice";
import DropZone2 from "../../components/DropZone2";

const UpdateProduct = () => {
  const [image, setImage] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const listCategory = useSelector((state) => state.categories.current);
  const listBrand = useSelector((state) => state.brands.current);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await productsApi.fetchProduct(id);
      setImage(fetch.product.image);
      setName(fetch.product.name);
      setCategory(fetch.product.category._id);
      setBrand(fetch.product.brand._id);
      setQuantity(fetch.product.quantity);
      setDescription(fetch.product.description);
      setPrice(fetch.product.price);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const action = await fetchCategoriesAsync();
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };

    const fetchBrand = async () => {
      const action = await fetchBrandsAsync();
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };

    fetchCategory();
    fetchBrand();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    try {
      console.log(newImage);
      const formData = new FormData();
      for (const file in newImage) {
        formData.append("files", newImage[file]);
      }
      formData.append("id", id);
      formData.append("name", name);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);

      const action = await updateProductAsync({ formData });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thêm sản phẩm thành công",
        }),
      );
    } catch (error) {
      store.dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        }),
      );
    }
  };

  return (
    <section className={styles.section}>
      <div>
        <Box>
          <Paper elevation={0} className={styles.paper}>
            <Typography> Image</Typography>
            <DropZone2 files={newImage} setFiles={setNewImage} />
          </Paper>
          <Paper elevation={0} className={styles.paper}>
            <Typography variant="h5">Nhập thông tin sản phẩm :</Typography>
            <TextField
              fullWidth
              label="Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              value={category}
              fullWidth
              onChange={(e) => setCategory(e.target.value)}>
              {listCategory.map((item) => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>

            <Select
              fullWidth
              value={brand}
              onChange={(e) => setBrand(e.target.value)}>
              {listBrand.map((item) => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              label="Tên"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              fullWidth
              label="Tên"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <TextField
              fullWidth
              label="Tên"
              value={description}
              multiline
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              onClick={handleSubmit}
              className={styles.button}
              type="submit"
              variant="contained">
              Xác nhận
            </Button>
          </Paper>
        </Box>
      </div>
    </section>
  );
};

export default UpdateProduct;
