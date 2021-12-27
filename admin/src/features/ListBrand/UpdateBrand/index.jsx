import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import brandsApi from "../../../api/brandApi";
import style from "./UpdateBrand.module.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { fetchCategoriesAsync } from "../../../app/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { upDateBrandAsync } from "../../../app/brandsSlice";

const UpdateBrand = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const listCategory = useSelector((state) => state.categories.current);

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await brandsApi.fetchBrandById(id);
      setName(fetch.brand.name);
      setCategory(fetch.brand.category._id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const action = await fetchCategoriesAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchCategory();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    const action = await upDateBrandAsync({ id, name, category });
    const actionResult = await dispatch(action);
    await unwrapResult(actionResult);
  };

  return (
    <section className={style.section}>
      <TextField value={name} onChange={(e) => setName(e.target.value)} />

      <FormControl>
        <InputLabel></InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {listCategory.map((item) => (
            <MenuItem value={item._id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleSubmit}>Xác Nhận</Button>
    </section>
  );
};

export default UpdateBrand;
