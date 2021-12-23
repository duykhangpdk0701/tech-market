const express = require("express");
const GoodReceivedController = require("../controller/GoodReceivedController");
const router = express.Router();

router.get("/", GoodReceivedController.getAll);
router.get("/:id", GoodReceivedController.getById);
router.post("/", GoodReceivedController.add);

module.exports = router;
