import React from "react";
import { Button, ButtonGroup, Chip, TableCell, TableRow } from "@mui/material";
import style from "./Item.module.scss";
import toPrice from "../../helper/toPrice";
import toDate from "../../helper/toDate";
import { ABORT, AWAIT, DELIVERED, DELIVERING } from "../../constants/status";
import { AirTwoTone } from "@mui/icons-material";

const Item = (props) => {
  const { ordered } = props;
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

  return (
    <>
      <TableCell>{ordered._id}</TableCell>
      <TableCell>{toDate(ordered.createdAt)}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{ordered.paymentMethod}</TableCell>
      <TableCell>{toPrice(ordered.totalPrice)}</TableCell>
      <TableCell>{toStatus(ordered.status)}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button>Chi tiết</Button>

          <Button
            color="error"
            disabled={ordered.status === AWAIT.value ? false : true}>
            Huỷ
          </Button>
        </ButtonGroup>
      </TableCell>
    </>
  );
};

export default Item;
