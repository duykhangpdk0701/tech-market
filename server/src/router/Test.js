const express = require("express");
const router = express.Router();
const testController = require("../controller/TestController");
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/assets"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.post("/", upload.single("image"), testController.uploadFIle);

module.exports = router;
