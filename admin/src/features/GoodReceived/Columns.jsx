import { Button, Typography } from "@mui/material";

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
  { field: "createdAt", headerName: "Ngày nhập", width: 250 },
  {
    field: "action",
    headerName: "Hành động",
    width: 250,
    renderCell: (params) => <Button variant="contained">Chi tiết</Button>,
  },
];

export default Columns;
