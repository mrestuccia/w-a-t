const helper = require('sendgrid').mail;
const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET || 'foo';
const emailTemplet = require('./templete.js')

const sendEmail = (user, group) => {

  try {
    var fromEmail = new helper.Email('hi@wat.com');
    var toEmail = new helper.Email(user.email);
    //var toEmail = new helper.Email('sarada032@hotmail.com');
    var subject = 'WAT - Invitation to join group';

    var serverURL = process.env.SERVER_URL;
    var SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || require('../config').SENDGRID_API_KEY;
    var sg = require('sendgrid')(SENDGRID_API_KEY);

    var jwtToken = jwt.encode({ id: user.id, groupid: group.id }, JWT_SECRET);

    var link = serverURL + '/api/userGroup/' + jwtToken + '/join';
    console.log('serverURL = ', serverURL + '/api/userGroup/' + jwtToken + '/join');

    //var html = `<body>Heyo! You are invited to you join to the group in WAT.<br/><a href='${serverURL}/api/userGroup/${jwtToken}/join'>Click here to join</a></body>`;

    var html = emailTemplet(link);

   
    // who is sending you thing too..
    //var html = `<body>Heyo! You are invited to you join to the group in WAT.<br/><a href='${serverURL}/api/userGroup/${jwtToken}/join'>Click here to join</a></body>`;

    
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
      //  console.log(response.body);
      // console.log(response.headers);
    });

  } catch (err) {
    //ignore
    console.log('error on sending email', err);
  }
};

// Function to calculate the distance between 2 coordinates
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var radius = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = radius * c; // Distance in km
  return d;
};


module.exports = {
  sendEmail,
  getDistanceFromLatLonInKm
};
