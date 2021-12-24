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
import React, { useState } from "react";
import style from "./ByDay.module.scss";

const ByDay = () => {
  const [date, setDate] = useState("2020-12-24");

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
        defaultValue="2020-12-24"
        onChange={(e) => setDate(e.target.value)}
        sx={{ width: 220 }}
      />

      <Button onClick={handleClick}>Click me</Button>

      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Người Mua</TableCell>
                <TableCell>Email người Mua</TableCell>
                <TableCell>Hình thức thanh toán</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ByDay;
