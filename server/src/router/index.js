const UserRouter = require("./User");
const CategoryRouter = require("./Category");
const BrandRouter = require("./Brand");
const ProductRouter = require("./Product");
const AdminRouter = require("./Admin");
const TestRouter = require("./Test");
const CartRouter = require("./Cart");
const OrderRouter = require("./Order");
const AddressRouter = require("./Address");

const Route = (app) => {
  app.use("/user", UserRouter);
  app.use("/category", CategoryRouter);
  app.use("/brand", BrandRouter);
  app.use("/product", ProductRouter);
  app.use("/admin", AdminRouter);
  app.use("/test", TestRouter);
  app.use("/cart", CartRouter);
  app.use("/order", OrderRouter);
  app.use("/address", AddressRouter);
};

module.exports = Route;
