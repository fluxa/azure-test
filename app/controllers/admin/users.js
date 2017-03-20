'use strict';

var models = require('../../models');

module.exports = {
    list : function(req, res) {
        models.User
            .find()
            .sort({ createdAt : -1 })
            .exec(function(err, docs) {
                res.render('admin/users/list', {
                    title : 'Users',
                    users : docs
                });
            });
    }
};
