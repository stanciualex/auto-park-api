const router = require('express').Router();

const userCtrl = require('../controllers/userCtrl');
const applyRichardsonLinks = require('../middlewares/applyRichardsonLinks');

router.route('/')
  .get(userCtrl.getAll, applyRichardsonLinks)
  .post(userCtrl.create);

router.route('/:id')
  .get(userCtrl.getById)
  .put(userCtrl.update)
  .delete(userCtrl.delete);

router.route('/login')
  .post(userCtrl.login);

router.route('/invite')
    .post(userCtrl.invite);

module.exports = router;