const UserRouter = require("./User");
const CategoryRouter = require("./Category");
const BrandRouter = require("./Brand");
const ProductRouter = require("./Product");

const Route = (app) => {
  app.use("/user", UserRouter);
  app.use("/category", CategoryRouter);
  app.use("/brand", BrandRouter);
  app.use("/product", ProductRouter);
};

module.exports = Route;
