const express = require("express");
const router = express.Router();
const AddressController = require("../controller/AddressController");

router.get("/:userId", AddressController.showByUserId);
router.post("/", AddressController.add);
router.delete("/", AddressController.remove);
router.put("/", AddressController.update);

module.exports = router;
