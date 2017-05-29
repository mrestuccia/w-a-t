const router = require('express').Router();
const helper = require('sendgrid').mail;
const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET || 'foo';

const models = require('../db').models;

// This is the API for anything related to the group
// Show all users that belongs to a groupId


// GET
// Get all the User in a particular group
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


// GET
// Join with Token is the confirmation
// that the user accepted the invitation.
// Ex: http://localhost:3000/group/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwiZ3JvdXBpZCI6N30.U6TN8SWGay6fGH_g4nuArZGx51l3nE2P6u0WLldFelw/join
router.get('/:token/join', (req, res, next) => {
  // TODO: Integrate this with Join screen
  const token = req.params.token;
  let decoded = jwt.decode(token, JWT_SECRET);
  console.log('decoded:', decoded);
  res.send(decoded);
});



// GET
// Selected friend
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

// POST
// Add the friend to the group
// Note: you need to have the SEND_GRID_API_KEY installed

const sendEmail = (user, group) => {


  try {
    var fromEmail = new helper.Email('hi@wat.com');
    var toEmail = new helper.Email('mrestuccia@mac.com');
    var subject = 'WAT - Invitation to join group';

    var serverURL = process.env.SERVER_URL;
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

    console.log('serverURL = ', serverURL);

    var jwtToken = jwt.encode({ id: user.id, groupid: group.id }, JWT_SECRET);
    var html = `<body>Heyo! user invited to you join to his group in WAT.<br/><a href='${serverURL}/api/group/${jwtToken}/join'>Click here to join</a></body>`;

    console.log('html', html);
    var content = new helper.Content('text/html', html);

    var mail = new helper.Mail(fromEmail, subject, toEmail, content);


    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
      if (error) {
        console.log('Error response received');
      }
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });

  } catch (e) {
    //ignore
  }
};


router.post('/:id', (req, res, next) => {
  const friend = req.body;
  let user = {};

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
          return models.User.create({ name: friend.name, email: friend.email });
        }
        return user;
      })
      .then(_user => {
        user = _user;
        // add the user to the group
        return models.UserGroup.create({ userId: user.id, groupId: req.params.id });
      })
      .then(userGroup => {
        // notify the user via email
        sendEmail(user, userGroup);

      });
  }


  res.send();

});




module.exports = router;