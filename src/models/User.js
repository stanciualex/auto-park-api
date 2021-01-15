const thinky = require('../lib/thinky');
const r = thinky.r;
const type = thinky.type;

const User = thinky.createModel("User", {
  id: type.string(),
  firstName: type.string(),
  lastName: type.string(),
  email: type.string().required(),
  password: type.string().required(),
  description: type.string(),
  picture: type.string().default(''), // modify to blob
  jobTitle: type.string(),
  role: type.string().required(),
  createdAt: type.date().default(r.now()),
  deleted: type.boolean().default(false)
});

module.exports = User;
