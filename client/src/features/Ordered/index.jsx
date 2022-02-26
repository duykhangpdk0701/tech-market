import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderedByUserIdAsync } from "../../app/orderedSlice";
import style from "./Ordered.module.scss";
import Item from "./Item";

const Ordered = () => {
  const userId = localStorage.getItem("userId");
  const ordered = useSelector((state) => state.ordered.current);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const action = await getOrderedByUserIdAsync({ userId });
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };
    fetchData();
  }, [dispatch, userId]);

  return (
    <section className={style.section}>
      <div className={style.container}>
        <Typography variant="h5">Đơn hàng</Typography>
        <TableContainer
          sx={{
            boxShadow: 1,
            bgcolor: "background.paper",
            mb: 3,
            mr: 3,
            p: 2,
          }}
          className={style.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>address</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordered[0] &&
                ordered.map(
                  (item) =>
                    item.status !== 0 && (
                      <TableRow key={item._id}>
                        <Item ordered={item} />
                      </TableRow>
                    ),
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className={style.container}>
        <Typography variant="h5">Đã huỷ</Typography>
        <TableContainer
          sx={{
            boxShadow: 1,
            bgcolor: "background.paper",
            mb: 3,
            mr: 3,
            p: 2,
          }}
          className={style.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>address</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordered[0] &&
                ordered.map(
                  (item) =>
                    item.status === 0 && (
                      <TableRow key={item._id}>
                        <Item ordered={item} />
                      </TableRow>
                    ),
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default Ordered;
