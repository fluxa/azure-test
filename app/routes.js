'use strict';

var config = require('../config');
var path = require('path');

module.exports = function(app) {

    var API = require('./controllers/api');
    var admin = require('./controllers/admin');
    var mw = require('./controllers/mw');

    // Admin
    app.get('/', function (req, res) {
        res.redirect('/admin');
    });
    app.get('/admin/login', admin.login.view);
    app.get('/admin/logout', admin.login.logout);
    app.post('/admin/login', admin.login.post);
    
    app.get('/admin', mw.isLogged, admin.users.list);

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
