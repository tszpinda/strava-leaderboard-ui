'use strict';
const assert = require('assert');
const statusApi = require('./status-client');
const log = require('./log');

describe('leaderboard view', function() {

    it('open', function*(){
        var res = yield statusApi.getPage('/leaderboard/view');
        assert.equal(200, res.statusCode, 'leaderboard/view page found'); 
    });

});
