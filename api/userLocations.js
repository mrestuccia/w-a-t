const router = require('express').Router();
const models = require('../db').models;

// This is the API for userlocation
// api/userlocation


// GET userId and update UserGroup table with lat and long


router.post('/:userid', (req, res, next) => {
  const _userId = req.params.userid;
  models.User.findOne(
    {
      where: {
        id: _userId
      }
    })
    .then((user)=>{
        return models.UserLocation.create({
            lat:user.lat,
            long:user.long,
            name:req.body.name,
            userId:user.id
        })
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

// Delete
// router.delete('/:userId/locationId', (req, res, next) => {


//     // Delete myself from the group
//     models.UserGroup.destroy({ where: { userId: req.params.userId, groupId: req.params.groupId } })
//       .then(count => {
//         if (count === 0) {
//           return res.sendStatus(404)
//         } else {
//           return models.UserGroup.count({ where: { groupId: req.params.groupId } })
//         }
//       })
//       .then(count => {
//         if (count === 0) {
//           return models.UserGroup.destroy({ where: { groupId: req.params.groupId } })
//         }
//         return count;
//       })
//       .then(count => {
//         res.status(200).send({count});
//       })
//       .catch(next);
//   }
// });
 


module.exports = router;
