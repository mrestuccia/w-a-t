const router = require('express').Router();
const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET || 'foo';

const models = require('../db').models;
const sendEmail = require('./utils');

// GET
// Join with Token is the confirmation
// that the user accepted the invitation.
// Ex: http://localhost:3000/userGroup/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwiZ3JvdXBpZCI6N30.U6TN8SWGay6fGH_g4nuArZGx51l3nE2P6u0WLldFelw/join
router.get('/:token/join', (req, res, next) => {
  const token = req.params.token;
  let decoded = jwt.decode(token, JWT_SECRET);
  console.log('decoded:', decoded);
  //res.send(decoded);
  res.redirect(`/#/login/${token}`);
});


// POST
// Adding a Friend to a group
router.post('/:groupId', (req, res, next) => {
  console.log('userGroup', req.params.groupId, req.body);
  const friend = req.body;
  let user = {};

  if (!friend.email || !req.params.groupId) {
    return res.sendStatus(404);
  } else {
    // Find to see if already exist
    models.User.findOne({
      where: {
        $or: [
          { email: friend.email },
          { googleEmail: friend.email },
          { facebookEmail: friend.email }
        ]
      }
    })
      .then(_user => {
        if (!_user) {
          // Create the user
          return models.User.create({ name: friend.name, email: friend.email });
        }
        return _user;
      })
      .then(_user => {
        user = _user;
        // add the user to the group
        return models.UserGroup.findOrCreate({ where: { userId: user.id, groupId: req.params.groupId } });
      })
      .then(_userGroup => {
        // notify the user via email
        sendEmail(user, _userGroup);

        return models.UserGroup.findOne(
          {
            include: [{ model: models.User }],
            where: { groupId: _userGroup.groupId, userId: _userGroup.userId }
          });
      })
      .then(userGroup => {
        res.send(userGroup);
      });
  }
});

// DELETE
router.delete('/:groupId/:userId', (req, res, next) => {

  if (!req.params.groupId && !req.params.userId) {
    return res.sendStatus(404);
  } else {
    // Find that user on that group and remove
    return models.UserGroup.destroy({
      where: {
        groupId: req.params.groupId,
        userId: req.params.userId
      }
    })
      .then(count => {
        res.status(200).send(count);
      })
      .catch(next);
  }
});


module.exports = router;
