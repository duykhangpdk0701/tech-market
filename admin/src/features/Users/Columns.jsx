import { Link } from "react-router-dom";
import { Button, Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { toggleActiveUserAsync } from "../../app/userSlice";
import { store } from "../../app/store";
import { setSnackbar } from "../../app/snackBarSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "firstname", headerName: "First Name", width: 200 },
  { field: "lastname", headerName: "Last Name", width: 200 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "email",
    headerName: "Email",
    width: 200,
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
    width: 200,
    renderCell: (params) => {
      let loading = false;
      const handleToggleAcitveUser = async (e) => {
        try {
          loading = true;
          const action = await toggleActiveUserAsync({
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
          <Link to={`/user/${params.row._id}`}>
            <Button variant="outlined">View</Button>
          </Link>
          <LoadingButton
            onClick={handleToggleAcitveUser}
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
