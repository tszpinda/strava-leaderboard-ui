'use strict';
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap



module.exports = function(passport) {
  router.get('/auth/strava', passport.authenticate('strava'));

  router.get('/auth/strava/callback', passport.authenticate('strava', {
    successRedirect: '/leaderboard/view',
    failureRedirect: '/error-auth'
  }));

  router.get('/auth/unlink/strava', function(req, res) {
    var user = req.user
      , redirect = res.redirect.bind(res, '/profile');

    if(user && user.strava) {
      user.strava.token = undefined;
      user.save(redirect);
    }else{
      redirect();
    }
  });

  return router;
};
