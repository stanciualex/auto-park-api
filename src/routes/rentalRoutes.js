const router = require('express').Router();

const rentalCtrl = require('../controllers/rentalCtrl');
const applyRichardsonLinks = require('../middlewares/applyRichardsonLinks');

router.route('/')
  .get(rentalCtrl.getAll, applyRichardsonLinks)
  .post(rentalCtrl.create);

router.route('/:id')
  .get(rentalCtrl.getById)
  .put(rentalCtrl.update)
  .delete(rentalCtrl.delete);

router.route('/carId/:carId')
    .get(rentalCtrl.getByCarId);
router.route('/userId/:userId')
    .get(rentalCtrl.getByUserId);

module.exports = router;
