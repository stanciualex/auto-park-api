const thinky = require('../lib/thinky');
const type = thinky.type;

const Damage = thinky.createModel("Damage", {
  id: type.string(),
  carId: type.string().required(),
  userId: type.string().required(),
  date: type.date().required(),
  details: type.string().required(),
  location: type.string(),
  images: type.string(), // modify to blob
  solveDate: type.date(),
  solved: type.boolean().default(false),
  deleted: type.boolean().default(false)
});

module.exports = Damage;

const Car = require('./Car');
Damage.belongsTo(Car, "car", "carId", "id");

const User = require('./User');
Damage.belongsTo(User, "user", "userId", "id");