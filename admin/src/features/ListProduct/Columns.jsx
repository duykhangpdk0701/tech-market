import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "category.name", headerName: "Category", width: 200 },
  { field: "brand.name", headerName: "Brand", width: 200 },
  { field: "quantity", headerName: "Quantity", width: 250 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <>
        <Link to={`/product/${params.row._id}`}>
          <Button variant="outlined">View</Button>
        </Link>
        <Button variant="contained">Lock</Button>
      </>
    ),
  },
];

export default Columns;
