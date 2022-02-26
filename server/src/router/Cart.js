const express = require("express");
const router = express.Router();
const CartController = require("../controller/CartController");

router.post("/", CartController.show);

module.exports = router;
