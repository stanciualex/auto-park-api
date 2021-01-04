module.exports = function fileValidation(req, file, cb) {
    if (!file.originalname.match(/\.(png|PNG|jpg|JPG|jpeg|JPEG)$/)) {
        req.fileValidationError = 'Only png, jpeg and jpg files are allowed!';
        return cb(new Error('Only png, jpeg and jpg files are allowed!'), false);
    }
    return cb(null, true);
};
