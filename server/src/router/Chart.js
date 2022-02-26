const express = require("express");
const router = express.Router();
const ChartController = require("../controller/ChartController");

router.get("/year", ChartController.year);
router.get("/year2", ChartController.year2);
router.get("/category", ChartController.category);
router.post("/bydate", ChartController.byAmountOfDate);

module.exports = router;
