import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Tên nhà cung cấp", width: 200 },
  { field: "email", headerName: "Eamail", width: 200 },
  { field: "phone", headerName: "Số điện thoại", width: 200 },
  {
    field: "action",
    headerName: "Hành động",
    width: 200,
    renderCell: (params) => {
      return (
        <Link to={`/admin/provider/update/${params.row._id}`}>
          <Button>Cập nhật</Button>
        </Link>
      );
    },
  },
];

export default Columns;
