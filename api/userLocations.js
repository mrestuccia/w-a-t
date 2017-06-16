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

// router.delete('/:userId',(req,res,next)=>{
//   models.UserLocation.destroy({where:{userId:req.param.userId, id:req.params.locationId }})
//   .then(count => {
//     return res.sendStatus(404)
//   } else{

//   }
//   )
// })

module.exports = router;
