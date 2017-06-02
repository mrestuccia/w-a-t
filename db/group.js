const conn = require('./conn');

//constraints - unique?
const Group = conn.define('group', {
  name: {
    type: conn.Sequelize.STRING,
  }
});

module.exports = Group;
