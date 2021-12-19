import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import style from "./NavBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchSearch } from "../../app/searchSlice";
import {
  Autocomplete,
  TextField,
  Badge,
  Menu,
  Button,
  MenuItem,
  Paper,
  MenuList,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const NavBar = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.current) || [];
  const countCart = useSelector((state) => state.carts.current).length || 0;

  useEffect(() => {
    const fetchData = async () => {
      const action = await fetchSearch();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchData();
  }, [dispatch]);

  const handleInputOnchangeInputSearch = (e) => {};

  return (
    <nav className={style.nav}>
      <div className={style.nav_wrapper}>
        <div className={style.feature_container}>
          <div className={style.logo_container}>
            <Link to="/store">Tào Đạo store</Link>
          </div>
          <div className={style.search_container}>
            <Autocomplete
              freeSolo
              options={searchResult}
              renderOption={(props, option) => (
                <li {...props}>
                  <Link
                    className={style.link}
                    to={`/store/product/${option._id}`}>
                    {option.name}
                  </Link>
                </li>
              )}
              getOptionLabel={(option) => option.name || ""}
              renderInput={(params) => (
                <TextField
                  onChange={handleInputOnchangeInputSearch}
                  {...params}
                  label="Tìm kiếm"
                />
              )}
            />
          </div>
          <div className={style.user_profile}>
            <div className={style.menu}>
              <Typography>Button</Typography>
              <Paper className={style.menu_list}>
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Giỏ hàng</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Đơn mua</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            </div>

            <div className={style.cart}>
              <Link className={style.link_cart} to="/store/cart"></Link>
              <Badge badgeContent={countCart} color="primary">
                <ShoppingCartIcon
                  fontSize="large"
                  className={style.cart_logo}
                />
              </Badge>
              <span className={style.cart_title}>Giỏ Hàng</span>
            </div>
          </div>
        </div>
        <div className={style.product_type}>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/laptop">
            Laptop
          </NavLink>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/phone">
            Điện thoại
          </NavLink>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/headphone">
            Tai nghe
          </NavLink>
          <NavLink
            className={`link-light ${style.type}`}
            activeClassName={style.type_active}
            to="/store/keyboard">
            Bàn phím
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
