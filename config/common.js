'use strict';

module.exports = {
    time_format: 'YYYY-MM-DD HH:mm:ss',
    session_secret: 'asdaASasda3awe3A',
    admin : {
        login : {
            user : process.env.ADMIN_USER || 'admin',
            password : process.env.ADMIN_PASS || 'admin'
        }
    }
};
