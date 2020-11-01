const router = require('express').Router();

const rentalCtrl = require('../controllers/rentalCtrl');
const applyRichardsonLinks = require('../middlewares/applyRichardsonLinks');

// router.route('/')
//   .get(rentalCtrl.getAll, applyRichardsonLinks)
//   .post(rentalCtrl.create);
//
// router.route('/:id')
//   .get(rentalCtrl.getById)
//   .put(rentalCtrl.update)
//   .delete(rentalCtrl.delete);

module.exports = router;
