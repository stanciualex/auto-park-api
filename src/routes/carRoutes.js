const router = require('express').Router();

const carCtrl = require('../controllers/carCtrl');
const applyRichardsonLinks = require('../middlewares/applyRichardsonLinks');

// router.route('/')
//   .get(carCtrl.getAll, applyRichardsonLinks)
//   .post(carCtrl.create);
//
// router.route('/:id')
//   .get(carCtrl.getById)
//   .put(carCtrl.update)
//   .delete(carCtrl.delete);

module.exports = router;
