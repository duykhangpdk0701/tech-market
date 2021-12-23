const express = require("express");
const ProviderController = require("../controller/ProviderController");
const router = express.Router();

router.post("/", ProviderController.add);
router.get("/", ProviderController.getAll);

module.exports = router;
