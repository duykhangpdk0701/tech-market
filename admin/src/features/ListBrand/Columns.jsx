import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
    field: "action",
    headerName: "Hành động",
    width: 200,
    renderCell: (params) => (
      <Link to={`/admin/brand/update/${params.row._id}`}>
        <Button>Cập nhật</Button>
      </Link>
    ),
  },
];

export default Columns;
