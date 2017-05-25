// import {clientID, clientSecret, callbackURL} from '../config.js';
const clientID = require('../config.js').clientID;
const clientSecret = require('../config.js').clientSecret;
const callbackURL = require('../config.js').callbackURL;


const router = require ('express').Router();
const User = require ('../db/user.js');

const passport = require ('passport');

const GoogleStrategy = require ('passport-google-oauth').OAuth2Strategy ;

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

    
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// router.get('.', passport.authenticate('google', {scope:'email'}));



  module.exports = passport;



