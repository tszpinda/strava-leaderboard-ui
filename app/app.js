'use strict';
const express = require('express');
const log = require('./log');
const bodyParser = require('body-parser');
const cors = require('./cors');
const status = require('./status');
const leaderboard = require('./leaderboard');
const profile = require('./profile');
const session = require('express-session');

const port = 3000;
const cookieSecret = 'abc1234';

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: cookieSecret,
                 resave: false,
                 saveUninitialized: false
                 }));

require('./auth')(app);
app.use(express.static('public'));

app.use(cors);

app.use('/status', status);
app.use('/leaderboard', leaderboard);
app.use('/profile', profile);

app.use(function(err, req, res, done) {
  if(err)
    log.error('Error: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
  done();
});

app.listen(port, () => log.info('App started on port:', port));
