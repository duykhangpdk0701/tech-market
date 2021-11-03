const UserRouter = require("./User");
const CategoryRouter = require("./Category");
const BrandRouter = require("./Brand");
const ProductRouter = require("./Product");
const LaptopRouter = require("./Laptop");

const Route = (app) => {
  app.use("/user", UserRouter);
  app.use("/category", CategoryRouter);
  app.use("/brand", BrandRouter);
  app.use("/product", ProductRouter);
  app.use("/laptop", LaptopRouter);
};

module.exports = Route;
