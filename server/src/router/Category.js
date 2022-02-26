const express = require("express");
const router = express.Router();
const categoryController = require("../controller/CategoryController");

router.get("/", categoryController.showAll);
router.get("/:id", categoryController.show);
router.post("/store", categoryController.store);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

module.exports = router;
