const conn = require('./conn');

const UserGroup = conn.define('usergroup', {
  status: {
    type: conn.Sequelize.ENUM('pending', 'confirmed'),
    defaultValue: 'pending'
  }
});

module.exports = UserGroup;
