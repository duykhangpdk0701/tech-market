const express = require("express");
const ProviderController = require("../controller/ProviderController");
const router = express.Router();

router.post("/", ProviderController.add);

module.exports = router;
