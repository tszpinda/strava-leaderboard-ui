'use strict';

const keys = require('./config/keys').strava;
const Strategy = require('passport-strava').Strategy;
const passport = require('passport');
const users = {};

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(require('./auth-strava')(passport));
};

passport.serializeUser(function(user, done) {
    users[user.id] = user;
    console.log('serializeUser', user.displayName, user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var u = users[id];
  console.log('deserializedUser', u.displayName, id, u);
  done(null, u);
});

passport.use(new Strategy({
    clientID     : keys.clientID,
    clientSecret : keys.clientSecret,
    callbackURL  : 'http://leaderboard:3000/auth/strava/callback',
    passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
    process.nextTick(function() {
      if(req.user)
        return done(null, req.user);

      if(profile){
        console.log('profile returned', profile.id, profile.displayName);
        users[profile.id] = profile;
        return done(null, {displayName: profile.displayName, id: profile.id, stravaToken: token});
      }
      console.log('profile undefined');

      return done({message: 'not found', error: 'user not found?'}, null);
    });
  }));
