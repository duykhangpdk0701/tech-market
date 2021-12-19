import { LoadingButton } from "@mui/lab";
import { Button, Typography } from "@mui/material";
import { ACCOUNTANT, MANAGER, STAFF } from "../../constant/role";
import { store } from "../../app/store";
import { setValue, openDialog } from "../../app/selectStatus";

const Column = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "firstname", headerName: "First Name", width: 150 },
  { field: "lastname", headerName: "Last Name", width: 150 },
  { field: "username", headerName: "Admin Name", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "role",
    headerName: "Chức vụ",
    width: 150,
    renderCell: (params) => {
      const returnChip = (params) => {
        if (params.row.role === 1) {
          return <Typography>{MANAGER.label}</Typography>;
        } else if (params.row.role === 2) {
          return <Typography>{ACCOUNTANT.label}</Typography>;
        } else if (params.row.role === 3) {
          return <Typography>{STAFF.label}</Typography>;
        } else {
          return <Typography>{STAFF.label}</Typography>;
        }
      };

      return <>{returnChip(params)}</>;
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
          <LoadingButton onClick={handleOpenDialog}>
            Thay đổi chức vụ
          </LoadingButton>
        </>
      );
    },
  },
];

export default Column;
