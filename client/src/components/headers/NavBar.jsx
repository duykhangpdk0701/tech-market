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
  MenuItem,
  Paper,
  MenuList,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Box,
  Popover,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  ContentCopy,
  Logout,
  Settings,
  ShoppingBag,
} from "@mui/icons-material";
import { clearCart } from "../../app/cartsSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.current) || [];
  const countCart = useSelector((state) => state.carts.current).length || 0;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    localStorage.clear();
    dispatch(clearCart());
  };

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
    <Box sx={{ boxShadow: 1 }} className={style.nav}>
      <div className={style.nav_wrapper}>
        <div className={style.feature_container}>
          <div className={style.logo_container}>
            <Link to="/store">
              <Typography variant="h5" className={style.logo}>
                Tào Đạo
              </Typography>
            </Link>
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
                  className={style.autocomplete}
                  onChange={handleInputOnchangeInputSearch}
                  {...params}
                  label="Tìm kiếm"
                />
              )}
            />
          </div>
          <div className={style.user_profile}>
            <div className={style.menu}>
              {localStorage.getItem("token") ? (
                <>
                  <Avatar
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}>
                    {localStorage.getItem("username")[0]}
                  </Avatar>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}>
                    <Paper sx={{ width: 200, maxWidth: "100%" }}>
                      <MenuList>
                        <Link to="/store/ordered">
                          <MenuItem>
                            <ListItemIcon>
                              <ShoppingBag fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Đơn mua</ListItemText>
                          </MenuItem>
                        </Link>
                        <Link to="/store/cart">
                          <MenuItem>
                            <ListItemIcon>
                              <ShoppingCartIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Giỏ hàng</ListItemText>
                          </MenuItem>
                        </Link>
                        <MenuItem>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Cài đặt</ListItemText>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          <ListItemText onClick={logout}>
                            Đăng xuất
                          </ListItemText>
                        </MenuItem>
                      </MenuList>
                    </Paper>
                  </Popover>
                </>
              ) : (
                <>
                  <Typography>
                    <Link style={{ color: "#fff" }} to="/auth">
                      <Button color="inherit">Đăng nhập</Button>
                    </Link>
                  </Typography>
                </>
              )}
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
          {/* <NavLink
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
          </NavLink> */}
        </div>
      </div>
    </Box>
  );
};

export default NavBar;
