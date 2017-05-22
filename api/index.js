const app = require('express').Router();
const group = require('./group');
const user = require('./user');


app.use('/group', group);
app.use('/user', user);

module.exports = app;
