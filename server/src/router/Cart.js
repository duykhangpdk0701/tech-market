const express = require("express");
const router = express.Router();
const CartController = require("../controller/CartController");

router.get("/:id", CartController.showByUserId);
router.post("/", CartController.add);

module.exports = router;
