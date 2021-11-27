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
];

export default Columns;
