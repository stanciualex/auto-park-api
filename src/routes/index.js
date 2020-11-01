const router = require('express').Router();

const userRoutes = require('./userRoutes');
const carRoutes = require('./carRoutes');
const damageRoutes = require('./damageRoutes');
const rentalRoutes = require('./rentalRoutes');

router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/damages', damageRoutes);
router.use('/rentals', rentalRoutes);

module.exports = router;
