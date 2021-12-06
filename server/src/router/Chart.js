const express = require("express");
const router = express.Router();
const ChartController = require("../controller/ChartController");

router.get("/year", ChartController.year);
router.get("/category", ChartController.category);

module.exports = router;
