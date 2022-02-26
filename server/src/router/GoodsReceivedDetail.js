const express = require("express");
const GoodsReceivedDetailController = require("../controller/GoodsReceivedDetailController");
const router = express.Router();

router.post("/", GoodsReceivedDetailController.add);

module.exports = router;
