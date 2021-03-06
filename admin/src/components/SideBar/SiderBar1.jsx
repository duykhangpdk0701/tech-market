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
  AdminPanelSettings,
  DynamicForm,
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

const SideBar1 = () => {
  const match = useRouteMatch();
  const [openOrder, setOpenOrder] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openGoodReceived, setOpenGoodReceived] = useState(false);
  const [openProvider, setOpenProvider] = useState(false);
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
  const handleClickChart = () => {
    setOpenChart(!openChart);
  };
  const handleClickAdmin = () => {
    setOpenAdmin(!openAdmin);
  };

  const handleClickReceived = () => {
    setOpenGoodReceived(!openGoodReceived);
  };

  const handleClickProvider = () => {
    setOpenProvider(!openProvider);
  };

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_wrapper}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          subheader={
            <ListSubheader component="div">Thanh ??i???u h?????ng</ListSubheader>
          }>
          {/* Home */}
          <ListItemButton component={NavLink} to="/admin">
            <ListItemIcon>
              <Home color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="subtitle2">Trang ch???</Typography>}
            />
          </ListItemButton>
          <Divider />
          {/* Order */}
          <ListItemButton onClick={handleClickOrder}>
            <ListItemIcon>
              <Inventory color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="subtitle2">????n h??ng</Typography>}
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
                  primary={<Typography variant="body2">Danh s??ch</Typography>}
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
                  primary={
                    <Typography variant="body2">Ch??a x??c nh???n</Typography>
                  }
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
                    <Typography variant="body2">??ang v???n chuy???n</Typography>
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
                  primary={<Typography variant="body2">???? giao</Typography>}
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
                  primary={<Typography variant="body2">???? Hu???</Typography>}
                />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />

          {/* Th???ng k?? */}
          <ListItemButton onClick={handleClickChart}>
            <ListItemIcon>
              <Storefront color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="subtitle2">Th???ng k??</Typography>}
            />
            {openChart ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openChart} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to="/admin/analytics">
                <ListItemIcon>
                  <ViewList color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">Th???ng k??</Typography>}
                />
              </ListItemButton>
            </List>
            <List disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to="/admin/analytics/byday">
                <ListItemIcon>
                  <ViewList color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">Th???ng k?? theo ng??y</Typography>
                  }
                />
              </ListItemButton>
            </List>

            <List disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to="/admin/analytics/byamountofday">
                <ListItemIcon>
                  <ViewList color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      Th???ng k?? theo kho???ng ng??y
                    </Typography>
                  }
                />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />

          {/* ????n nh???p */}
          <ListItemButton onClick={handleClickReceived}>
            <ListItemIcon>
              <DynamicForm color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="subtitle2">????n nh???p</Typography>}
            />
            {openGoodReceived ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openGoodReceived} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to="/admin/goodreceived">
                <ListItemIcon>
                  <ViewList color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">Danh s??ch</Typography>}
                />
              </ListItemButton>
            </List>
            <List disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to="/admin/goodreceived/add">
                <ListItemIcon>
                  <Add color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">Th??m</Typography>}
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
              primary={<Typography variant="subtitle2">S???n ph???m</Typography>}
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
                  primary={<Typography variant="body2">Danh s??ch</Typography>}
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
                  primary={<Typography variant="body2">Th??m</Typography>}
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
              primary={<Typography variant="subtitle2">Th????ng hi???u</Typography>}
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
                  primary={<Typography variant="body2">Danh s??ch</Typography>}
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
                  primary={
                    <Typography variant="body2">Th??m danh m???c</Typography>
                  }
                />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />

          {/* nh?? cung c???p */}
          <ListItemButton onClick={handleClickProvider}>
            <ListItemIcon>
              <BrandingWatermark color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2">Nh?? cung c???p</Typography>
              }
            />
            {openProvider ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openProvider} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={NavLink}
                to="/admin/provider">
                <ListItemIcon>
                  <ViewList color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">Danh s??ch</Typography>}
                />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
        </List>
      </div>
    </div>
  );
};

export default SideBar1;
