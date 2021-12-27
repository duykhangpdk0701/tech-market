import React from "react";
import {
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import style from "./Item.module.scss";
import toPrice from "../../helper/toPrice";
import toDate from "../../helper/toDate";
import { ABORT, AWAIT, DELIVERED, DELIVERING } from "../../constants/status";
import { AirTwoTone } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { setSnackbar } from "../../app/snackbarSlice";
import { setStatusAsync } from "../../app/orderedSlice";

const Item = (props) => {
  const { ordered } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const address = `${ordered.address.street} ${ordered.address.district} ${ordered.address.province}`;
  const toStatus = (status) => {
    switch (status) {
      case AWAIT.value:
        return <Chip label={AWAIT.label} variant="outlined" color="warning" />;
      case DELIVERING.value:
        return (
          <Chip label={DELIVERING.label} variant="outlined" color="primary" />
        );
      case DELIVERED.value:
        return (
          <Chip label={DELIVERED.label} variant="outlined" color="success" />
        );
      case ABORT.value:
        return <Chip label={ABORT.label} variant="outlined" color="error" />;
      default:
        return <Chip label={AWAIT.label} variant="outlined" color="warning" />;
    }
  };

  const handleAbortOrder = async (e) => {
    try {
      const action = await setStatusAsync({ id: ordered._id, status: 0 });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Huỷ thành công!",
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Huỷ Không thành công!",
        }),
      );
    }
    handleClose();
  };

  return (
    <>
      <TableCell>{ordered._id}</TableCell>
      <TableCell>{toDate(ordered.createdAt)}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{ordered.paymentMethod}</TableCell>
      <TableCell>{toStatus(ordered.status)}</TableCell>
      <TableCell>{toPrice(ordered.totalPrice)}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button>Chi tiết</Button>

          <Button
            onClick={handleClickOpen}
            color="error"
            disabled={ordered.status === AWAIT.value ? false : true}>
            Huỷ
          </Button>
        </ButtonGroup>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            Bạn có chắc chắn là muốn huỷ đơn hàng chứ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Một khi bạn huỷ đơn hàng bạn không thể quay trở về trước khi huỷ.
              Hãy cân nhắc thật kỹ trước khi huỷ đơn hàng
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Thôi</Button>
            <Button onClick={handleAbortOrder} autoFocus>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
    </>
  );
};

export default Item;
