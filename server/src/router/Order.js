const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");

router.get("/", orderController.showAll);
router.get("/:id", orderController.show);
router.post("/store", orderController.store);
// router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);
router.put("/status", orderController.setStatus);
module.exports = router;
