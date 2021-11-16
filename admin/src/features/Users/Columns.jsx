import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "firstname", headerName: "First Name", width: 200 },
  { field: "lastname", headerName: "Last Name", width: 200 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <>
        <Link to={`/admin/user/${params.row._id}`}>
          <Button variant="outlined">View</Button>
        </Link>
        <Button variant="contained">Lock</Button>
      </>
    ),
  },
];

export default Columns;
