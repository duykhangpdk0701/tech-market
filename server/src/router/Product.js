const express = require("express");
const router = express.Router();
const {
  ProductController,
  LaptopController,
  PhoneController,
} = require("../controller/ProductController");

router.get("/", ProductController.showAll);
router.get("/:id", ProductController.show);
//laptop
router.get("/products/laptop", LaptopController.showAll);
//phone
router.get("/products/phone", PhoneController.showAll);

//admin
router.delete("/:id", ProductController.delete);
router.put("/:id", ProductController.update);
router.post("/store", ProductController.store);
module.exports = router;
