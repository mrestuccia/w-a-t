const router = require('express').Router();
const models = require('../db').models;

// This is the API for anything related to the group


// Show all users that belongs to a groupId
router.get('/:id', (req, res, next) => {
  const _groupId = req.params.id;
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

module.exports = router;