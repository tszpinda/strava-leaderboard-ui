'use strict';
const assert = require('assert');
const statusApi = require('./status-client');
const log = require('./log');

describe('app health check', function() {

    it('status/app api', function*(){
        var res = yield statusApi.getAppStatus();
        assert.equal(200, res.statusCode, 'http status ok'); 
    });

    it('index page', function*(){
        var res = yield statusApi.getIndexPage();
        assert.equal(200, res.statusCode, 'index page found'); 
    });

});
