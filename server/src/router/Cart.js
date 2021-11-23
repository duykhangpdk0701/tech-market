const express = require("express");
const router = express.Router();
const CartController = require("../controller/CartController");

router.get("/:id", CartController.showByUserId);
router.post("/", CartController.add);
router.delete("/", CartController.delete);

module.exports = router;
