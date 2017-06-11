const router = require('express').Router();
const models = require('../db').models;

const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET || 'foo';

// This is the API for anything related to the user
// including setting location

// GET auth
// token exchange
router.get('/auth/:token', (req, res, next) => {
  console.log('test token', req.params.token);
  const token = jwt.decode(req.params.token, JWT_SECRET);
  models.User.findById(token.id)
    .then(user => res.send(user))
    .catch(next);
});

// GET auth
// Find a user given a name and password
router.post('/auth', (req, res, next) => {
  models.User.findOne({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  })
    .then(user => {
      if (!user) {
        return res.sendStatus(401);
      }
      const token = jwt.encode({ id: user.id }, JWT_SECRET);
      res.send({ token, user });
    });
});

// GET
// This show all the groups that this user is part of
router.get('/:id/groups', (req, res, next) => {
  const _userId = req.params.id;
  models.UserGroup.findAll(
    {
      include: [
        { model: models.Group }
      ],
      where: {
        userId: _userId
      }
    })
    .then((groups) => {
      res.send(groups);
    })
    .catch(next);
});

// PUT
// Update the location
// Get's a token with the user id
router.put('/:token', (req, res, next) => {
  const location = req.body;
  const token = req.params.token;

  const decoded = jwt.decode(token, JWT_SECRET);


  // Check if I have the data: lat and long
  if (!location && !location.lat && !location.long && !decoded.id ) return res.sendStatus(404);


  // Find the user
  models.User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then((user) => {
      // Update the user
      user.lat = req.body.lat;
      user.long = req.body.long;
      return user.save();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});


module.exports = router;
