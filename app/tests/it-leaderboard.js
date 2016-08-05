'use strict';
const assert = require('assert');
const statusApi = require('./status-client');

describe('leaderboard view', function() {

    it('open', function*(){
        this.timeout(5000);
        var res = yield statusApi.getPage('/leaderboard/view');
        assert.equal(200, res.statusCode, 'leaderboard/view page found');
    });

});
