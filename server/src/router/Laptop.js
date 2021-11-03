const express = require("express");
const router = express.Router();
const laptopController = require("../controller/LaptopController");

router.get("/", laptopController.ShowAll);

module.exports = router;
