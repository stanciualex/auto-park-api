const router = require('express').Router();

const userRoutes = require('./userRoutes');
const carRoutes = require('./carRoutes');
const damageRoutes = require('./damageRoutes');
const rentalRoutes = require('./rentalRoutes');
const fileRoutes = require('./fileRoutes');

router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/damages', damageRoutes);
router.use('/rentals', rentalRoutes);
router.use('/file', fileRoutes);

module.exports = router;
