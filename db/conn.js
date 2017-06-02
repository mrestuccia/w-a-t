const Sequelize = require('sequelize');

//make logging an environment variable
const conn = new Sequelize(process.env.DATABASE_URL, {logging: false});

module.exports = conn;
