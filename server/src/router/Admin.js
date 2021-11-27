const express = require("express");
const AdminController = require("../controller/AdminController");
const router = express.Router();

router.post("/login", AdminController.login);
router.post("/register", AdminController.register);
router.get("/getUsers", AdminController.getAllUser);
router.get("/getUsers/:id", AdminController.getUser);
router.put("/toggle-active", AdminController.toggleActiveUser);

module.exports = router;
