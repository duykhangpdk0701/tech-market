import { Chip, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";
import { store } from "../../app/store";
import { setValue, openDialog } from "../../app/selectStatus";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import toDate from "../../helper/toDate";

const Columns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "Tài khoản đặt hàng",
    width: 200,
    valueFormatter: (params) => {
      return params.value.username;
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 250,
    renderCell: (params) => {
      const returnChip = (params) => {
        if (params.row.status === 0) {
          return (
            <Chip
              icon={<CheckIcon />}
              label="Đã huỷ"
              color="error"
              variant="outlined"
              size="small"
            />
          );
        } else if (params.row.status === 1) {
          return (
            <Chip
              icon={<CheckIcon />}
              label="Đang chờ xác nhận"
              color="warning"
              variant="outlined"
              size="small"
            />
          );
        } else if (params.row.status === 2) {
          return (
            <Chip
              icon={<CheckIcon />}
              label="Đang giao Hàng"
              color="primary"
              variant="outlined"
              size="small"
            />
          );
        } else if (params.row.status === 3) {
          return (
            <Chip
              icon={<CheckIcon />}
              label="Đã giao"
              color="success"
              variant="outlined"
              size="small"
            />
          );
        }
        return (
          <Chip
            icon={<CheckIcon />}
            label="Đang chờ xác nhận"
            color="warning"
            variant="outlined"
            size="small"
          />
        );
      };

      return <>{returnChip(params)}</>;
    },
  },

  {
    field: "createdAt",
    headerName: "Thời gian đặt hàng",
    width: 200,
    renderCell: (params) => {
      return toDate(params.row.createdAt);
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const handleOpenDialog = (e) => {
        store.dispatch(
          setValue({ id: params.row._id, status: params.row.status || 1 }),
        );
        store.dispatch(openDialog());
      };

      return (
        <>
          <LoadingButton
            disabled={params.row.status === 0 || params.row.status === 3}
            onClick={handleOpenDialog}>
            setStatus
          </LoadingButton>
          <Link to={`/admin/order/${params.row._id}`}>
            <Button>Chi tiết</Button>
          </Link>
        </>
      );
    },
  },
];

export default Columns;
