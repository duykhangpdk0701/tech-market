const express = require("express");
const app = express();
const cors = require("cors");
const Route = require("./router/index");
require("dotenv").config();

//import router
const connectDB = require("./config/conn");

//connect DB
connectDB();

app.use(express.json());
//cors
const whitelist = [process.env.CLIENT_URL, process.env.ADMIN_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, Accept",
  );
  next();
});

Route(app);

// middleware router
app.get("/", (req, res) => {
  res.status(200).send("hello this is home api");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on ${process.env.PORT} ...`);
});
