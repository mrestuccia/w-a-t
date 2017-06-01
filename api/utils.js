const helper = require('sendgrid').mail;
const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET || 'foo';


const sendEmail = (user, group) => {

  try {
    var fromEmail = new helper.Email('hi@wat.com');
    var toEmail = new helper.Email('mrestuccia@mac.com');
    var subject = 'WAT - Invitation to join group';

    var serverURL = process.env.SERVER_URL;
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

    console.log('serverURL = ', sg);

    var jwtToken = jwt.encode({ id: user.id, groupid: group.id }, JWT_SECRET);
    var html = `<body>Heyo! user invited to you join to his group in WAT.<br/><a href='${serverURL}/api/userGroup/${jwtToken}/join'>Click here to join</a></body>`;

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

module.exports = sendEmail;