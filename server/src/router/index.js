const UserRouter = require("./User");
const CategoryRouter = require("./Category");
const BrandRouter = require("./Brand");
const ProductRouter = require("./Product");
const AdminRouter = require("./Admin");
const TestRouter = require("./Test");
const CartRouter = require("./Cart");
const OrderRouter = require("./Order");
const AddressRouter = require("./Address");
const ChartRouter = require("./Chart");
const GoodsReceivedRouter = require("./GoodsReceived");
const GoodsReceivedDetailRouter = require("./GoodsReceivedDetail");
const ProviderRouter = require("./Provider");

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
  app.use("/chart", ChartRouter);
  app.use("/goodsreceived", GoodsReceivedRouter);
  app.use("/goodsreceiveddetail", GoodsReceivedDetailRouter);
  app.use("/provider", ProviderRouter);
};

module.exports = Route;
