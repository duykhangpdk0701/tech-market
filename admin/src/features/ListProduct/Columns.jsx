import { Link } from "react-router-dom";
import { Button, Chip, ButtonGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toggleActive } from "../../app/productsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { store } from "../../app/store";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { setSnackbar } from "../../app/snackBarSlice";

const Columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "category",
    headerName: "Category",
    width: 200,
    valueFormatter: (params) => {
      return params.value.name;
    },
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 200,
    valueFormatter: (params) => {
      return params.value.name;
    },
  },
  { field: "quantity", headerName: "Quantity", width: 200 },
  {
    field: "isActive",
    headerName: "Active",
    width: 250,
    renderCell: (params) => {
      return (
        <>
          {params.row.isActive ? (
            <Chip
              icon={<CheckIcon />}
              label="Active"
              color="success"
              variant="outlined"
              size="small"
            />
          ) : (
            <Chip
              icon={<CloseIcon />}
              label="Not active"
              color="error"
              variant="outlined"
              size="small"
            />
          )}
        </>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 250,
    renderCell: (params) => {
      let loading = false;
      const handleToggleAcitveProduct = async (e) => {
        try {
          loading = true;
          const action = await toggleActive({
            id: params.row._id,
            isActive: params.row.isActive,
          });
          const actionResult = await store.dispatch(action);
          unwrapResult(actionResult);
          store.dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarType: "success",
              snackbarMessage: "Thành công",
            }),
          );
          loading = false;
        } catch (error) {
          console.log(error);
          store.dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: "Không thành công",
            }),
          );
        }
      };

      return (
        <>
          <Link to={`/product/${params.row._id}`}>
            <Button variant="outlined">View</Button>
          </Link>
          <Link to={`/admin/product/update/${params.row._id}`}>
            <Button variant="outlined">Cập nhật</Button>
          </Link>
          <LoadingButton
            onClick={handleToggleAcitveProduct}
            variant="contained"
            loading={loading}
            color={params.row.isActive ? "primary" : "error"}>
            {params.row.isActive ? "Lock" : "Unlock"}
          </LoadingButton>
        </>
      );
    },
  },
];

export default Columns;
