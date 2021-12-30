import { Button, ButtonGroup, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import toDate from "../../helper/toDate";

const Columns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "admin",
    headerName: "Người nhập",
    width: 200,
    renderCell: (params) => (
      <>
        <Typography>{params.row.admin.username}</Typography>
      </>
    ),
  },
  {
    field: "provider",
    headerName: "Nhà cung cấp",
    width: 200,
    renderCell: (params) => <Typography>{params.row.provider.name}</Typography>,
  },
  {
    field: "createdAt",
    headerName: "Ngày nhập",
    width: 250,
    renderCell: (params) => (
      <Typography>{toDate(params.row.createdAt)}</Typography>
    ),
  },
  {
    field: "action",
    headerName: "Hành động",
    width: 250,
    renderCell: (params) => (
      <ButtonGroup>
        <Link to={`/admin/goodreceived/${params.row._id}`}>
          <Button>Chi tiết</Button>
        </Link>
      </ButtonGroup>
    ),
  },
];

export default Columns;
