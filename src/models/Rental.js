const thinky = require('../lib/thinky');
const type = thinky.type;

const Rental = thinky.createModel("Rental", {
  id: type.string(),
  carId: type.string().required(),
  userId: type.string().required(),
  startDate: type.date().required(),
  endDate: type.date().required(),
  details: type.string(),
  state: type.string().default('requested'),
  deleted: type.boolean().default(false)
});

module.exports = Rental;

const Car = require('./Car');
Rental.belongsTo(Car, "car", "carId", "id");

const User = require('./User');
Rental.belongsTo(User, "user", "userId", "id");
