const app = require('express').Router();
const group = require('./group');
const user = require('./user');
const userGroup = require('./userGroup');



app.use('/group', group);
app.use('/user', user);
app.use('/userGroup', userGroup);

module.exports = app;
