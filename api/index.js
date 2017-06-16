const app = require('express').Router();
const group = require('./group');
const user = require('./user');
const userGroup = require('./userGroup');
const userLocation = require('./userLocations');


app.use('/group', group);
app.use('/user', user);
app.use('/userGroup', userGroup);
app.use('/userlocation', userLocation);

module.exports = app;
