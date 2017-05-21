const conn = require('./conn');

const Group = conn.define('group', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  }
});

module.exports = Group;
