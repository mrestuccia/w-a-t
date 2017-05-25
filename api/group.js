const router = require('express').Router();
const models = require('../db').models;

// This is the API for anything related to the group
// Show all users that belongs to a groupId

router.get('/:id', (req, res, next) => {
  const _groupId = req.params.id;

  console.log('_groupId**',_groupId)

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

//selected fiend
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
    res.send(friend.user)
  })
  .catch(next)

});

module.exports = router;