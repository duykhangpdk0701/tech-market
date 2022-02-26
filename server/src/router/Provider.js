const express = require("express");
const ProviderController = require("../controller/ProviderController");
const router = express.Router();

router.post("/", ProviderController.add);
router.get("/", ProviderController.getAll);
router.get("/:id", ProviderController.getById);
router.put("/", ProviderController.update);

module.exports = router;
