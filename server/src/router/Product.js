const express = require("express");
const router = express.Router();
const {
  ProductController,
  LaptopController,
  PhoneController,
} = require("../controller/ProductController");

router.get("/", ProductController.showAll);
router.get("/:id", ProductController.show);
router.post("/store", ProductController.store);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
//laptop
router.get("/products/laptop", LaptopController.showAll);
//phone
router.get("/products/phone", PhoneController.showAll);
module.exports = router;
