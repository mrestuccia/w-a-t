const express = require('express');
const path = require('path');
const app = express();
const clientID = require('./config.js').clientID;
const clientSecret = require('./config.js').clientSecret;
const callbackURL = require('./config.js').callbackURL;
const GoogleStrategy = require ('passport-google-oauth20').Strategy ;

const router = require ('express').Router();
const User = require ('./db/user.js');

const passport = require ('passport');

module.exports = app;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

passport.use (
    new GoogleStrategy({
        clientID:clientID,
        clientSecret:clientSecret,
        callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
      let userInfo = {
        name: profile.displayName,
        password: profile.id
      };

    
    User.findOrCreate({ where: { googleId: profile.id }}).then(function (user, err) {
        //console.log(cb);
      return cb();
    });
  }
));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { scope: ['profile'], failureRedirect: '/',successRedirect:'/' }),
  function(req, res, next) {
    // Successful authentication, redirect home.P
    res.redirect('/');
  });

app.use('/api', require('./api/'));

