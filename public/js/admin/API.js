var API = {
    User: {
        delete: function(id, callback) {
            $.ajax({
                    method:     "DELETE",
                    url:        "/api/v1/users/"+id
                })
                .done(function( res ) {
                    callback(null, res);
                })
                .fail(function(res) {
                    callback(res, null);
                });
        }
    },
    Push: {
        post: function(isBroadcast, message, userId, callback) {
            $.ajax({
                method: 'POST',
                url:    '/admin/pushes',
                data:   {
                    is_broadcast: isBroadcast,
                    notification: {
                        title: 'Falabella Seguros',
                        notificationMsg: message
                    },
                    user: userId
                }
            })
            .done(function( res ) {
                callback(null, res);
            })
            .fail(function(res) {
                callback(res, null);
            });
        }

    }
};
