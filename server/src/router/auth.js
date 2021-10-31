const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);


