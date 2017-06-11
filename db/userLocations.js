const conn = require('./conn');

const userLocations = conn.define('userlocation', {
  name: {
    type: conn.Sequelize.STRING
  },
  lat: conn.Sequelize.FLOAT,
  long: conn.Sequelize.FLOAT
});

module.exports = userLocations ;