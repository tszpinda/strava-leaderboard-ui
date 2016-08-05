'use strict';

const keys = require('./config/keys').strava;
const Strategy = require('passport-strava').Strategy;

var users = {};

module.exports = function(passport){
  console.log(passport);
  console.log(keys);
  console.log(Strategy);

  passport.serializeUser(function(user, done) {
      users[id] = user;
      done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    done(null, users[id]);
  });

  passport.use(new Strategy({
      clientID     : keys.clientID,
      clientSecret : keys.clientSecret,
      callbackURL  : 'http://localhost:3000/auth/strava/callback',
      passReqToCallback: true
    },
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        if(!req.user)
          return done(null, user);
        return done({message: 'not found'}, null);
      });
    }));
};
