import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./CompleteOrder.module.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CompleteOrder = () => {
  return (
    <Box className={style.container}>
      <CheckCircleOutlineIcon sx={{ fontSize: 100 }} color="success" />
      <Typography variant="h4" sx={{ m: 1 }}>
        Đơn hàng của bạn đã được lưu lại.
      </Typography>
      <Button variant="outlined" component={Link} to="/store">
        Tiếp tục mua hàng
      </Button>
    </Box>
  );
};

export default CompleteOrder;
