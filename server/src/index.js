const express = require("express");
const app = express();
const cors = require("cors");
const Route = require("./router/index")
require("dotenv").config();

//import router
const connectDB = require("./config/conn");

//connect DB
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

Route(app)

// middleware router
app.get("/", (req, res) => {
  res.status(200).send("hello this is home api");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on ${process.env.PORT} ...`);
});
