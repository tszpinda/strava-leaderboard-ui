'use strict';
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get('/', ensureLoggedIn('/auth/strava'), function(req, res) {
    res.render('profile', {title: 'Profile', user: req.user});
});

module.exports = router;
