var express = require('express');
var router = express.Router();
var multer=require('multer');

    
//--
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "../public/upload/");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count

//upload api
router.post('/', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

//--
module.exports = router;