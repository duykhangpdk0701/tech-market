const UserRouter = require("./User");
const CategoryRouter = require("./Category");
const BrandRouter = require("./Brand");
const ProductRouter = require("./Product");
const AdminRouter = require("./Admin");

const Route = (app) => {
  app.use("/user", UserRouter);
  app.use("/category", CategoryRouter);
  app.use("/brand", BrandRouter);
  app.use("/product", ProductRouter);
  app.use("/admin", AdminRouter);
};

module.exports = Route;
