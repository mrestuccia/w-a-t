const express = require('express');
const path = require('path');
const app = express();

// Google Strategy
const googleClientID = require('./config.js').google.clientID;
const googleClientSecret = require('./config.js').google.clientSecret;
const googleCallbackURL = process.env.googleCallbackURL || require('./config.js').google.callbackURL;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Facebook Stategy
const facebookClientID = require('./config.js').facebook.clientID;
const facebookClientSecret = require('./config.js').facebook.clientSecret;
const facebookCallbackURL = process.env.facebookCallbackURL || require('./config.js').facebook.callbackURL;
const FacebookStrategy = require('passport-facebook').Strategy;

console.log('facebookClientID', facebookClientID);
console.log('facebookClientSecret', facebookClientSecret);
console.log('facebookCallbackURL', facebookCallbackURL);



const jwt = require('jwt-simple');
const router = require('express').Router();
const db = require('./db');
const passport = require('passport');
const JWT_SECRET = 'foo';


app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

passport.use(
  new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL,
    scope: 'email'
  },
    function (accessToken, refreshToken, profile, done) {
      console.log('hello google !!!', profile.photos[0].value);
      db.models.User.findOne({ where: { email: profile.emails[0].value } })
        .then(function (user) {
          if (user) {
            user.googleId = profile.googleId;
            user.photo = profile.photos[0].value;
            return user.save();
          }
          return db.models.User.create({
            name: profile.name.givenName,
            email: profile.emails[0].value,
            googleId: profile.id,
            photo: profile.photos[0].value
          });
        })
        .then(function (user) {
          done(null, user);
        })
        .catch((err) => done(err, null));
    }));

passport.use(new FacebookStrategy({
  clientID: facebookClientID,
  clientSecret: facebookClientSecret,
  callbackURL: facebookCallbackURL,
  profileFields: ['id', 'displayName', 'email', 'photos']
},
  function (accessToken, refreshToken, profile, done) {
    db.models.User.findOne({ where: { email: profile.emails[0].value } })
      .then(function (user) {
        if (user) {
          console.log('found the user');
          user.facebookId = profile.id;
          user.photo = profile.photos[0].value;
          return user.save();
        }
        return db.models.User.create({
          name: profile.DisplayName,
          email: profile.emails[0].value,
          facebookId: profile.id,
          facebookEmail: profile.emails[0].value,
          photo: profile.photos[0].value
        });
      })
      .then(function (user) {
        done(null, user);
      })
      .catch((err) => done(err, null));
  }
));

// Generic Passport function use by Facebook
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));


// Google CallBacks
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed', session: false }),
  function (req, res) {
    var jwtToken = jwt.encode({ id: req.user.id }, JWT_SECRET);
    // Successful authentication, redirect home.
    res.redirect(`/?token=${jwtToken}`);
  });


// Facebook Callbacks
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    var jwtToken = jwt.encode({ id: req.user.id }, JWT_SECRET);
    // Successful authentication, redirect home.
    res.redirect(`/?token=${jwtToken}`);
  });


app.use('/api', require('./api/'));

module.exports = app;

