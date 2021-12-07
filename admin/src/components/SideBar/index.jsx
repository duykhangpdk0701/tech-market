import {
  ExpandLess,
  ExpandMore,
  Storefront,
  Add,
  ViewList,
  Category,
  BrandingWatermark,
  ManageAccounts,
  Home,
  Pending,
  LocalShipping,
  CheckCircle,
  Cancel,
  Inventory,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import style from "./SideBar.module.scss";

const SideBar = () => {
  const match = useRouteMatch();
  const [openOrder, setOpenOrder] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  const handleClickOrder = () => {
    setOpenOrder(!openOrder);
  };
  const handleClickProduct = () => {
    setOpenProduct(!openProduct);
  };

  const handleClickCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleClickBrand = () => {
    setOpenBrand(!openBrand);
  };

  const handleClickAccount = () => {
    setOpenAccount(!openAccount);
  };

  return (
    <div className={style.sidebar}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        subheader={
          <ListSubheader component="div">Thanh điều hướng</ListSubheader>
        }>
        {/* Home */}
        <ListItemButton component={NavLink} to="/admin">
          <ListItemIcon>
            <Home color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="subtitle2">Trang chủ</Typography>}
          />
        </ListItemButton>
        <Divider />
        {/* Order */}
        <ListItemButton onClick={handleClickOrder}>
          <ListItemIcon>
            <Inventory color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="subtitle2">Đơn hàng</Typography>}
          />
          {openOrder ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrder} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/order">
              <ListItemIcon>
                <ViewList color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Danh sách</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/order/pending">
              <ListItemIcon>
                <Pending color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Chưa xác nhận</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/order/delivering">
              <ListItemIcon>
                <LocalShipping color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Đang vận chuyển</Typography>
                }
              />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/order/delivered">
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đã giao</Typography>}
              />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/order/abort">
              <ListItemIcon>
                <Cancel color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Đã Huỷ</Typography>}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* product */}
        <ListItemButton onClick={handleClickProduct}>
          <ListItemIcon>
            <Storefront color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="subtitle2">Sản phẩm</Typography>}
          />
          {openProduct ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/product">
              <ListItemIcon>
                <ViewList color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Danh sách</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/product/add">
              <ListItemIcon>
                <Add color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Thêm</Typography>}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* Brand */}
        <ListItemButton onClick={handleClickBrand}>
          <ListItemIcon>
            <BrandingWatermark color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="subtitle2">Thương hiệu</Typography>}
          />
          {openBrand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openBrand} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/brand">
              <ListItemIcon>
                <ViewList color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Danh sách</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/brand/add">
              <ListItemIcon>
                <Add color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Thêm danh mục</Typography>}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* category */}
        <ListItemButton onClick={handleClickCategory}>
          <ListItemIcon>
            <Category color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="subtitle2">Danh mục</Typography>}
          />
          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/category">
              <ListItemIcon>
                <ViewList color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Danh sách</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/category/add">
              <ListItemIcon>
                <Add color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Thêm danh mục</Typography>}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* account */}
        <ListItemButton onClick={handleClickAccount}>
          <ListItemIcon>
            <ManageAccounts color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="subtitle2">Tài Khoản </Typography>}
          />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/admin/user">
              <ListItemIcon>
                <ViewList color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Danh sách</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/admin/user/add">
              <ListItemIcon>
                <Add color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Thêm danh mục</Typography>}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
      </List>
    </div>
  );
};

export default SideBar;
