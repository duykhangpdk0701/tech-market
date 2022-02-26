const express = require("express");
const router = express.Router();
const {
  ProductController,
  LaptopController,
  PhoneController,
} = require("../controller/ProductController");
const upload = require("../Middleware/UploadImg");

router.get("/", ProductController.showAll);
router.get("/admin", ProductController.showAllAdminDSide);
router.put("/", upload.array("files", 10), ProductController.update);
router.get("/:id", ProductController.show);

//laptop
router.get("/products/laptop", LaptopController.showAll);
//phone
router.get("/products/phone", PhoneController.showAll);

//admin
router.post("/store", upload.array("files", 10), ProductController.store);
router.put("/permit", ProductController.disactive);
router.delete("/:id", ProductController.delete);
module.exports = router;
