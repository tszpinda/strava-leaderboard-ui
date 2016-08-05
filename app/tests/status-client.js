'use strict';

const request = require('request');
const baseUrl = 'http://localhost:3000';

function send(url, contentType) {
    return new Promise(resolve => {
        var config = {
            uri: baseUrl + url,
            method: 'GET',
            contentType: contentType
        };
        request(config, (err, res, body) => {
            resolve({error: err, statusCode: res.statusCode, body: body});
        });
    });
}

module.exports = {
    getAppStatus: function(){
        return send('/status/app', 'application/json');
    },
    getIndexPage: function(){
        return send('/index.html', 'text/html');
    },
    getPage: function(url){
        return send(url, 'text/html');
    }
};
