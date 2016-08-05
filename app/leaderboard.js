'use strict';
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

router.get('/view', function(req, res) {
  res.render('leaderboard', {title: 'good mmor', message: 'ok ok'});
});


module.exports = router;
