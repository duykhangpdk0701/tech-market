import {
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
import { Box } from "@mui/system";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getByDateOrderAsync } from "../../../app/orderSlice";
import style from "./ByDay.module.scss";
import { Link } from "react-router-dom";
import toPrice from "../../../helper/toPrice";

const ByDay = () => {
  const [date, setDate] = useState("2021-12-04");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.orders.currentSta) || [];
  const sum = useSelector((state) => state.orders.sum);

  useEffect(() => {
    const fetchByDate = async () => {
      const action = await getByDateOrderAsync({ date });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };
    fetchByDate();
  }, [dispatch, date]);

  return (
    <div className={style.container}>
      <Box>
        <Typography variant="h3">Thống kê theo ngày</Typography>
        <Box marginRight={1}>
          <Typography margin={1}>Ngày</Typography>
          <TextField
            id="date"
            label="Ngày"
            type="date"
            defaultValue="2021-12-04"
            onChange={(e) => setDate(e.target.value)}
            sx={{ width: 220 }}
          />
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
                  <>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell>{item.user.username}</TableCell>
                      <TableCell>{item.user.email}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>{item.formattedDate}</TableCell>
                      <TableCell>{toPrice(item.totalPrice)}</TableCell>
                      <TableCell>
                        <Link to="/">
                          <Button>Chi tiết</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
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

export default ByDay;
