const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const verifyToken = require("../Middleware/VerifyToken");

router.get("/load", verifyToken, userController.load);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
