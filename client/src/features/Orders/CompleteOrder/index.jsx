import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CompleteOrder = () => {
  return (
    <Box>
      <Typography>Đơn hàng của bạn đã được lưu lại</Typography>
      <Button variant="contained" component={Link} to="/store">
        Tiếp tục mua hàng
      </Button>
    </Box>
  );
};

export default CompleteOrder;
