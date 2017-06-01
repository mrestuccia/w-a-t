const express = require('express');
const path = require('path');
const app = express();
const clientID = require('./config.js').clientID;
const clientSecret = require('./config.js').clientSecret;
const callbackURL = process.env.callbackURL || require('./config.js').callbackURL;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy ;
const jwt = require('jwt-simple');
const router = require ('express').Router();
const db = require ('./db');
const passport = require ('passport');
JWT_SECRET = 'foo';


app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

passport.use(
    new GoogleStrategy({
        clientID:clientID,
        clientSecret:clientSecret,
        callbackURL: callbackURL,
        scope: 'email'
       // scope: "https://www.googleapis.com/auth/plus.login"
        // passReqToCallback : true // allows us to pass back the entire request to the callback
        
  },
  function(accessToken, refreshToken, profile, done) {
console.log('hello google !!!', profile.photos[0].value);
    db.models.User.findOne({ where: { googleId: profile.id }})
    .then(function (user) {
      if(user)
        return user;
      return db.models.User.create({
        name: profile.name.givenName,
        email: profile.emails[0].value,
        googleId: profile.id,
        photo: profile.photos[0].value
      });
    })
      .then(function(user){
        done(null, user);
      })
      .catch((err)=>done(err,null));
    }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));



app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  }));

app.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect: '/failed',session:false }),
  function(req, res) {
    var jwtToken = jwt.encode({id:req.user.id}, JWT_SECRET);
    // Successful authentication, redirect home.P
    res.redirect(`/?token=${jwtToken}`);
  });

app.use('/api', require('./api/'));

module.exports = app;

