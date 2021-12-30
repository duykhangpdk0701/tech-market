import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByAmountOfDateOrderAsync } from "../../../app/orderSlice";
import style from "./ByAmountOfDate.module.scss";
import {
  Box,
  Button,
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
import { Link } from "react-router-dom";
import toPrice from "../../../helper/toPrice";

const ByAmountOfDate = () => {
  const [startDate, setStartDate] = useState("2021-12-04");
  const [endDate, setEndDate] = useState("2021-12-05");
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.orders.currentSta) || [];
  const sum = useSelector((state) => state.orders.sum);

  useEffect(() => {
    const fetchData = async () => {
      const action = await getByAmountOfDateOrderAsync({ startDate, endDate });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch, startDate, endDate]);

  return (
    <div className={style.container}>
      <Box>
        <Typography variant="h3">Thống kê theo khoảng ngày</Typography>
        <Box className={style.time_picker}>
          <Box marginRight={1}>
            <Typography margin={1}>Ngày bắt đầu</Typography>
            <TextField
              id="date"
              label="Ngày bắt đầu"
              type="date"
              defaultValue="2021-12-04"
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ width: 220 }}
            />
          </Box>
          <Box marginLeft={1}>
            <Typography margin={1}>Ngày kết thúc</Typography>
            <TextField
              id="date"
              label="Ngày kết thúc"
              type="date"
              defaultValue="2021-12-05"
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ width: 220 }}
            />
          </Box>
        </Box>
      </Box>
      <Box className={style.table}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Người Mua</TableCell>
                <TableCell>Email người Mua</TableCell>
                <TableCell>Hình thức thanh toán</TableCell>
                <TableCell>Ngày mua</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrder.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>{item.user.username}</TableCell>
                    <TableCell>{item.user.email}</TableCell>
                    <TableCell>{item.paymentMethod}</TableCell>
                    <TableCell>{item.formattedDate}</TableCell>
                    <TableCell>{toPrice(item.totalPrice)}</TableCell>
                    <TableCell>
                      <Link to={`/admin/order/${item._id}`}>
                        <Button>Chi tiết</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography variant="h6">Tổng:</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell>
                  <Typography variant="h6">{toPrice(sum)}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ByAmountOfDate;
