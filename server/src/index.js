const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//import router
const testRouter = require("./router/test");

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

// middleware router
app.get("/", (req, res) => {
  res.status(200).send("hello this is home api");
});
app.use("/test", testRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on ${process.env.PORT} ...`);
});
console.log('ccccccccccccccccccccccccccccccccc')
