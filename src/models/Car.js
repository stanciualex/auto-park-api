const thinky = require('../lib/thinky');
const type = thinky.type;

const Car = thinky.createModel("Car", {
  id: type.string(),
  vin: type.string().required(),
  manufacturer: type.string().required(),
  model: type.string().required(),
  engine: type.string().required(),
  color: type.string().required(),
  image: type.string(), // modify to blob
  licencePlate: type.string().required(),
  fabricationDate: type.date(),
  insuranceValability: type.date(),
  itpValability: type.date(),
  nextService: type.date(),
  deleted: type.boolean().default(false)
});

module.exports = Car;
