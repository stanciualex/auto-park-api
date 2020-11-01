// For development purposes only
const config = require('../config');
const thinky = require('thinky')(config.database);

module.exports = thinky;
