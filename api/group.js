const router = require('express').Router();
const models = require('../db').models;

// This is the API for anything related to the group
// Show all users that belongs to a groupId

router.get('/:id', (req, res, next) => {
  const _groupId = req.params.id;

  console.log('_groupId**', _groupId);

  models.UserGroup.findAll(
    {
      include: [
        { model: models.User }
      ],
      where: {
        groupId: _groupId
      }
    })
    .then((users) => {
      res.send(users);
    })
    .catch(next);
});

//selected friend
router.get('/:gId/:uId', (req, res, next) => {
  const _groupId = req.params.gId;
  const _userId = req.params.uId;
  console.log(_groupId, _userId);
  models.UserGroup.findOne(
    {
      include: [
        {
          model: models.User
        }
      ],
      where: {
        groupId: _groupId,
        userId: _userId
      }
    })
    .then(friend => {
      res.send(friend.user);
    })
    .catch(next);

});


router.post('/:id', (req, res, next) => {
  const friend = req.body;
  console.log('groupId', req.params.id);
  console.log('friend', friend);


  if (!friend.email) {
    return res.sendStatus(404);
  } else {
    // Find to see if already exist
    models.User.findOne({
      where: {
        email: friend.email
      }
    })
      .then(user => {
        if (!user) {
          // Create the user
          return models.User.create({ email: friend.email });
        }
        return user;
      })
      .then(user => {
        // add the user to the group
        models.UserGroup.create({ userId: user.id, groupId: req.params.id });
      });
  }


  res.send();

});


module.exports = router;