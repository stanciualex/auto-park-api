const router = require('express').Router();

const damageCtrl = require('../controllers/damageCtrl');
const applyRichardsonLinks = require('../middlewares/applyRichardsonLinks');

// router.route('/')
//   .get(damageCtrl.getAll, applyRichardsonLinks)
//   .post(damageCtrl.create);
//
// router.route('/:id')
//   .get(damageCtrl.getById)
//   .put(damageCtrl.update)
//   .delete(damageCtrl.delete);

module.exports = router;
