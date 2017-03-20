'use strict';

module.exports = {
    isLogged: function(req, res, next) {
        var hasSession = req.session;
        var isAdmin = hasSession && req.session.role == 'admin';
        var isValid = hasSession && req.session.user;
        if (isAdmin && isValid) {
            next();
        } else {
            return res.redirect('/admin/login');
        }
    }    
};
