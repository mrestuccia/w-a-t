const express = require('express');
const path = require('path');
const app = express();

// Google Strategy
const googleClientID = process.env.googleClientID || require('./config.js').google.clientID;
const googleClientSecret = process.env.googleClientSecret || require('./config.js').google.clientSecret;
const googleCallbackURL = process.env.googleCallbackURL || require('./config.js').google.callbackURL;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Facebook Stategy
const facebookClientID = process.env.facebookClientID || require('./config.js').facebook.clientID;
const facebookClientSecret = process.env.facebookClientSecret || require('./config.js').facebook.clientSecret;
const facebookCallbackURL = process.env.facebookCallbackURL || require('./config.js').facebook.callbackURL;
const FacebookStrategy = require('passport-facebook').Strategy;

const jwt = require('jwt-simple');
const db = require('./db');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET || 'foo';


app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

passport.use(
  new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL,
    scope: 'email',
    passReqToCallback: true
  },
    function (request, accessToken, refreshToken, profile, done) {
      console.log('hello google !!!', profile.emails[0].value);

      const state = (request.query.state) ? JSON.parse(request.query.state) : null;
      const inviteCode = (state) ? state.inviteCode : null;

      console.log('state', state);
      console.log('invite', inviteCode);

      let userGroup = null;

      if (inviteCode) {
        userGroup = jwt.decode(inviteCode, JWT_SECRET);
        console.log('userGroup', userGroup.id, userGroup.groupid);

      }


      //Initation mode
      if (userGroup) {
        db.models.User.findById(userGroup.id)
          .then(user => {
            console.log('google user found', user);
            user.googleId = profile.googleId;
            user.googleEmail = profile.emails[0].value;
            user.photo = profile.photos[0].value;
            return user.save();
          })
          .then(function (user) {
            done(null, user);
          })
          .catch((err) => {
            console.log('err is=', err);
            done(err, null);
          });
      } else {

        let user = null;

        db.models.User.findOne({
          where: {
            $or: [
              { email: profile.emails[0].value },
              { googleEmail: profile.emails[0].value },
              { facebookEmail: profile.emails[0].value },
            ]
          }})
          .then(function (_user) {
            if (_user) {
              console.log('user already exists');
              _user.googleId = profile.googleId;
              _user.googleEmail = profile.emails[0].value;
              _user.photo = profile.photos[0].value;
              return _user.save();
            }
            return db.models.User.create({
              name: profile.name.givenName,
              email: profile.emails[0].value,
              googleId: profile.id,
              googleEmail: profile.emails[0].value,
              photo: profile.photos[0].value
            })
          })
          .then((_user) => {
            user = _user;
            return db.models.UserGroup.count(
              { where: { userId: _user.id } }
            )
          })
          .then((number) => {
            if (number === 0) {
              return db.models.Group.create({
                name: 'Default Group'
              })
                .then((groupInfo) => {
                  db.models.UserGroup.create({
                    status: 'confirmed',
                    userId: user.id,
                    groupId: groupInfo.id
                  });
                });
            }
            return null;
          })
          .then(() => {
            console.log('resulting user', user);
            done(null, user);
          })
          .catch((err) => {
            console.log('err is=', err);
            done(err, null);
          });
      }//else
    }));

passport.use(new FacebookStrategy({
  clientID: facebookClientID,
  clientSecret: facebookClientSecret,
  callbackURL: facebookCallbackURL,
  profileFields: ['id', 'displayName', 'email', 'photos'],
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {

    const state = (request.query.state) ? JSON.parse(request.query.state) : null;
    const inviteCode = (state) ? state.inviteCode : null;

    console.log('fb state', state);
    console.log('fb invite', inviteCode);

    let userGroup = null;

    if (inviteCode) {
      userGroup = jwt.decode(inviteCode, JWT_SECRET);
      console.log('fb userGroup', userGroup.id, userGroup.groupid);
    }

    //Initation mode
    if (userGroup) {
      db.models.User.findById(userGroup.id)
        .then(user => {
          console.log('fb user found', user);
          user.facebookId = profile.id;
          user.facebookEmail = profile.emails[0].value;
          user.photo = profile.photos[0].value;
          return user.save();
        })
        .then(function (user) {
          done(null, user);
        })
        .catch((err) => {
          console.log('err is=', err);
          done(err, null);
        });
    } else {

      let user = null;

      db.models.User.findOne({
          where: {
            $or: [
              { email: profile.emails[0].value },
              { googleEmail: profile.emails[0].value },
              { facebookEmail: profile.emails[0].value },
            ]
          }})
        .then(function (_user) {
          if (_user) {
            console.log('normal found the user');
            _user.facebookId = profile.id;
            _user.facebookEmail = profile.emails[0].value;
            _user.photo = profile.photos[0].value;
            return _user.save();
          }
          return db.models.User.create({
            name: profile.DisplayName,
            email: profile.emails[0].value,
            facebookId: profile.id,
            facebookEmail: profile.emails[0].value,
            photo: profile.photos[0].value
          });
        })
        .then((_user) => {
          user = _user;
          return db.models.UserGroup.count(
            { where: { userId: _user.id } }
          )
        })
        .then((number) => {
          if (number === 0) {
            return db.models.Group.create({
              name: 'Default Group'
            })
              .then((groupInfo) => {
                db.models.UserGroup.create({
                  status: 'confirmed',
                  userId: user.id,
                  groupId: groupInfo.id
                });
              });
          }
          return null;
        })
        .then(() => {
          console.log('resulting user', user);
          done(null, user);
        })
        .catch((err) => {
          console.log('err is=', err);
          done(err, null);
        });
    }
  }));

// Generic Passport function use by Facebook
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));


// Google CallBacks

app.get('/auth/google/', function (request, response, next) {

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    state: ''
  })(request, response, next);
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    var jwtToken = jwt.encode({ id: req.user.id }, JWT_SECRET);
    // Successful authentication, redirect home.
    res.redirect(`/?token=${jwtToken}`);
  });


app.get('/auth/google/:inviteCode', function (request, response, next) {
  console.log('callback google with invite code', request.params.inviteCode);
  const inviteCode = request.params.inviteCode || '';

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    state: JSON.stringify({ inviteCode: inviteCode })
  })(request, response, next);
});

// Facebook Callbacks

app.get('/auth/facebook/', function (request, response, next) {

  passport.authenticate('facebook', {
    scope: 'email',
    state: ''
  })(request, response, next);
});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    var jwtToken = jwt.encode({ id: req.user.id }, JWT_SECRET);
    // Successful authentication, redirect home.
    res.redirect(`/?token=${jwtToken}`);
  });


app.get('/auth/facebook/:inviteCode', function (request, response, next) {
  console.log('callback google with invite code', request.params.inviteCode);
  const inviteCode = request.params.inviteCode || '';

  passport.authenticate('facebook',
    {
      scope: 'email',
      state: JSON.stringify({ inviteCode: inviteCode })
    })(request, response, next);
});


app.use('/api', require('./api/'));

module.exports = app;