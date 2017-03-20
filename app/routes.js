'use strict';

var config = require('../config');
var path = require('path');

module.exports = function(app) {

    var API = require('./controllers/api');
    var admin = require('./controllers/admin');
    var mw = require('./controllers/mw');

    // 404
    app.use(function(err, req, res, next) {
        console.log(err);
        return res.status(404).send(err);
    });

    // 401 Unauthorized
    app.use(function(err, req, res, next) {
        res.status(401).send(err);
        next(err);
    });
};
