const router = require('express').Router();

const fileCtrl = require('../controllers/fileCtrl');

router.route('/')
  .post(fileCtrl.uploadFile);

router.route('/:dirName/:fileName')
  .get(fileCtrl.downloadFile)
  .delete(fileCtrl.removeFile);

module.exports = router;
