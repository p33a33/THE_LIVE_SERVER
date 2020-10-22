const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log();
        console.log(file.fieldname);
        let destinationPath = 'uploads/';

        if (file.fieldname === 'avatar') {
            destinationPath += 'profile/'
        } else if (file.fieldname === 'products') {
            destinationPath += 'products/'
        }
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname +
            '-' +
            Date.now() +
            '.' +
            file.originalname.split('.')[file.originalname.split('.').length - 1]
        );   // 체크
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) { //res
        console.log();
        console.log();
        console.log();
        let ext = path.extname(file.originalname);
        console.log(ext);
        if (file.fieldname === 'avatar') {
            if (!['.jpg', '.jpeng', '.png', '.gif'].includes(ext)) {
                return callback(new Error('Only Images are allowed'));
            }
            if (file.size < 110 * 110 * 2) {
                return callback(new Error('File size exceeds 2 MB'));
            }
        }
        if (file.fieldname === 'products') {
            if (!['.jpg', '.jpeng', '.png', '.gif'].includes(ext)) {
                return callback(new Error('Only Images are allowed'));
            }
            if (file.size > 1024 * 1024 * 15) {
                return callback(new Error('File size exceeds 15 MB'));
            }
        }
        callback(null, true);
    }
});

module.exports = upload;