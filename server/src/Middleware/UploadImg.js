const multer = require('multer');
var path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/public/assets');
    },

    filename: function (req, file, callback) {
        callback(null, req.body.name + '-' + Date.now() + path.extname(file.originalname));
    },
});

module.exports = multer({ storage: storage })