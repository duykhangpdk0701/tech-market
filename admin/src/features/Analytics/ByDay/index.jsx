import {
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getByDateOrderAsync } from "../../../app/orderSlice";
import style from "./ByDay.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ByDay = () => {
  const [date, setDate] = useState("2021-12-04");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.orders.currentSta) || [];

  useEffect(() => {
    const fetchByDate = async () => {
      const action = await getByDateOrderAsync({ date });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };
    fetchByDate();
  }, [dispatch, date]);

  const handleClick = () => {
    console.log(date);
  };

  return (
    <div className={style.container}>
      <Typography>Thống kê theo ngày</Typography>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2021-12-04"
        onChange={(e) => setDate(e.target.value)}
        sx={{ width: 220 }}
      />

      <Button onClick={handleClick}>Click me</Button>

      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Người Mua</TableCell>
                <TableCell>Email người Mua</TableCell>
                <TableCell>Hình thức thanh toán</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrder.map((item) => {
                return (
                  <>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}>
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{item.user.username}</TableCell>
                      <TableCell>{item.user.email}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>{item.totalPrice}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div">
                              Chi Tiết
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.orderDetail &&
                                  item.orderDetail.map((orderDetail) => (
                                    <TableRow key={orderDetail._id}>
                                      <TableCell component="th" scope="row">
                                        {orderDetail.product}
                                      </TableCell>
                                      <TableCell>
                                        {orderDetail.quantity}
                                      </TableCell>
                                      <TableCell>{orderDetail.price}</TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ByDay;
