const router = require("express").Router();
const models = require("../db").models;
const { getDistanceFromLatLonInKm } = require("./utils");

// This is the API for anything related to the group

// GET
// Get all the Users in a particular group
router.get("/:id", (req, res, next) => {
  const _groupId = req.params.id;

  console.log("_groupId**", _groupId);

  models.UserGroup
    .findAll({
      include: [
        { model: models.User, include: [{ model: models.UserLocation }] }
      ],
      where: {
        groupId: _groupId
      }
    })
    .then(users => {
      users.forEach(user => {
        let userLocations = user.dataValues.user.dataValues.userlocations;
        //check if this use has any location label
        if (userLocations.length > 0) {
          // define the radius
          let closestDistance = 10;
          let locationLabel = "";
          userLocations.forEach(location => {
            let currentDistance = getDistanceFromLatLonInKm(
              user.dataValues.user.dataValues.lat,
              user.dataValues.user.dataValues.long,
              location.dataValues.lat,
              location.dataValues.long
            );
            if (currentDistance < closestDistance) {
              // if the current location is smaller than closestDistance, assign the name to label and then assign labble to location name
              locationLabel = location.name;
            }
          });
              user.locationname = locationLabel;
        } else {
          return user;
        }
      });
      res.send(users);
      // console.log('Iam printing users',users);
    })
    .catch(next);
});

// GET
// Selected friend
router.get("/:gId/:uId", (req, res, next) => {
  const _groupId = req.params.gId;
  const _userId = req.params.uId;
  console.log(_groupId, _userId);
  models.UserGroup
    .findOne({
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

// Group CRUD functions
// Add Group
router.post("/:userId", (req, res, next) => {
  if (!req.body.name || !req.params.userId) {
    return res.sendStatus(404);
  } else {
    // Create the group
    models.Group
      .create({ name: req.body.name })
      .then(group => {
        // add yourself to the group
        return models.UserGroup.create({
          userId: req.params.userId,
          groupId: group.id
        });
      })
      .then(userGroup => {
        // reply to the user.
        res.status(200).send(userGroup);
      })
      .catch(next);
  }
});

// Remove group:
// 1. Remove myself
// 2. If empty, delete the group
router.delete("/:groupId/:userId", (req, res, next) => {
  if (!req.params.groupId || !req.params.userId) {
    return res.sendStatus(404);
  } else {
    // Delete myself from the group
    models.UserGroup
      .destroy({
        where: { userId: req.params.userId, groupId: req.params.groupId }
      })
      .then(count => {
        if (count === 0) {
          return res.sendStatus(404);
        } else {
          return models.UserGroup.count({
            where: { groupId: req.params.groupId }
          });
        }
      })
      .then(count => {
        if (count === 0) {
          return models.UserGroup.destroy({
            where: { groupId: req.params.groupId }
          });
        }
        return count;
      })
      .then(count => {
        res.status(200).send({ count });
      })
      .catch(next);
  }
});

// Update Group
router.put("/:groupId/:userId", (req, res, next) => {
  const info = req.body;

  if (!req.params.groupId || (!req.params.userId && !info)) {
    return res.sendStatus(404);
  } else {
    models.Group
      .findById(req.params.groupId)
      .then(group => {
        if (!group) return res.sendStatus(404);
        group.name = info.name;
        return group.save();
      })
      .then(group => {
        res.status(200).send(group);
      })
      .catch(next);
  }
});

module.exports = router;
