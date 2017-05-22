const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING,
  lat: conn.Sequelize.FLOAT,
  long: conn.Sequelize.FLOAT,
  lastUpdate: conn.Sequelize.DATE
});

module.exports = User;
