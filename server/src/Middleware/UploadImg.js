const multer = require("multer");
const { nanoid } = require("nanoid");
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./src/public/assets");
  },

  filename: function (req, file, callback) {
    callback(
      null,
      nanoid() + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

module.exports = multer({ storage: storage });
