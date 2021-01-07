const multer = require('multer');
const fs = require('fs');

const fileValidation = require('../utils/fileValidation');

module.exports.uploadFile = (req, res) => {
  const storage = multer.diskStorage({
    destination(request, file, cb) {
      cb(null, './uploads');
    },
    filename(request, file, cb) {
      const extArray = file.mimetype.split('/');
      const extension = extArray[extArray.length - 1];
      cb(null, `${Date.now()}.${extension}`);
    },
  });

  const upload = multer({ storage, fileFilter: fileValidation }).array('files', 10);

  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } if (!req.files) {
      return res.send('Please select a file to upload.');
    } if (err instanceof multer.MulterError) {
      return res.send('Please select no more than 10 files to upload. ');
    } if (err) {
      return res.send(err);
    }
    const pathArray = req.files.map((file) => ({ path: file.path }));
    return res.json({ files: pathArray });
  });
};

module.exports.downloadFile = (req, res) => {
  const { dirName } = req.params;
  const { fileName } = req.params;
  const filePath = `${dirName}/${fileName}`;
  // eslint-disable-next-line consistent-return
  res.download(filePath, (err) => {
    if (err) {
      return res.send(err);
    }
  });
};

module.exports.removeFile = (req, res) => {
  const { dirName } = req.params;
  const { fileName } = req.params;
  const filePath = `${dirName}/${fileName}`;
  fs.unlink(filePath, (err) => {
    if (err && err.code === 'ENOENT') {
      res.send("File doesn't exist, won't remove it.");
    } else if (err) {
      res.send('Error occurred while trying to remove file');
    } else {
      res.json({
        message: 'Success',
        file: filePath,
      });
    }
  });
};
