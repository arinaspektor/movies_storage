const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const uploadFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
   
    cb(null, ext == '.txt');
}

const upload = multer({
    storage: storage,
    fileFilter: uploadFilter,
    limits: { fileSize: 1024 * 1024 * 2 }
}).single('file');

module.exports = function (req, res, next) {
    return upload(req, res, next, (err) => {
        if(err) {
          return res.status(400).json({ message: "Error uploading file." });
        }
        next();
    });
}