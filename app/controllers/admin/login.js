'use strict';

var config = require('../../../config');

module.exports = {
    view : function(req, res) {
        return res.render('admin/login.jade');
    },
    post : function(req, res) {
        if (!req.body.user || !req.body.password) {
            return res.redirect('/admin/login');
        }
        var sameUser = req.body.user == config.common.admin.login.user;
        var samePwd  = req.body.password == config.common.admin.login.password;

        if (sameUser && samePwd) {
            // Auth
            req.session.role = 'admin';
            req.session.user = req.body.user;
            return res.redirect('/admin/');
        } else {
            return res.redirect('/admin/login');
        }
    },
    logout: function(req, res) {
        req.session.destroy();
        return res.redirect('/admin');
    }
};
