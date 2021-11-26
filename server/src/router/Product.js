const express = require("express");
const router = express.Router();
const {
  ProductController,
  LaptopController,
  PhoneController,
} = require("../controller/ProductController");
const upload = require("../Middleware/UploadImg");

router.get("/", ProductController.showAll);
router.get("/:id", ProductController.show);

//laptop
router.get("/products/laptop", LaptopController.showAll);
//phone
router.get("/products/phone", PhoneController.showAll);

//admin
router.post("/store", upload.array("images", 10), ProductController.store);
router.put("/permit", ProductController.disactive);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
module.exports = router;
