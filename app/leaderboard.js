'use strict';
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap
var strava = require('strava-v3');
var async = require('async');

router.get('/view', function(req, res) {
  segmentList().then(segments => async.map(segments, leaderboardList, (err, results)=>{
    res.render('leaderboard', {title: 'Leaderboard', message: 'Leaderboard', error: err, results: results});
  }))
  .catch(err => {
    res.render('leaderboard', {title: 'Leaderboard Error', message: 'no no not ok', error: err});
  });
});

function segmentList() {
    return new Promise((resolve, reject)=> {
        strava.segments.listStarred({page:1, per_page:130}, (err, payload) => { // eslint-disable-line camelcase
            if(err)return reject(err);
            return resolve(payload);
        });
    });
}


function leaderboardList(segment, callback) {
    extractLeaderboardData(segment)
        .then((data) => callback(null, data))
        .catch((err) => callback(err, null));
}

function extractLeaderboardData(segment) {
    return new Promise((resolve, reject)=> {
        strava.segments.listLeaderboard({id: segment.id, following:true}, (err, payload) => {
            if(err)return reject(err);
            var data = {segment: segment, efforts: []};
            payload.entries.map(effort => data.efforts.push(effortToLeaderboardData(effort)));
            return resolve(data);
        });
    });
}

function effortToLeaderboardData(effort) {
    return{athleteName: effort.athlete_name, time: toTime(effort.moving_time)};
}

function toTime(seconds) {
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var sec = seconds - (hours * 3600) - (minutes * 60);

    if(hours < 10)
      hours   = '0' + hours;
    if(minutes < 10)
      minutes = '0' + minutes;
    if(sec < 10)
      sec = '0' + sec;
    return hours + ':' + minutes + ':' + sec;
}

module.exports = router;
