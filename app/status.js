'use strict';
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

router.get('/app', function(req, res) {
  res.status(200).json({message: 'ok'});
});

router.get('/db', function(req, res) {
  //query db see if its up
  res.status(200).json({message: 'ok'});
});

router.get('/', function(req, res) {
  console.log('status:ok');
  res.status(200).json({message: 'ok'});
});

module.exports = router;
