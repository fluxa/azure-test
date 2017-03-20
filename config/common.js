'use strict';

module.exports = {
    timeZone : 'America/Santiago',
    timeFormat : 'YYYY-MM-DD HH:mm:ss',
    sessionSecret : 'asdaASasda3awe3A',
    admin : {
        login : {
            user : process.env.ADMIN_USER || 'admin',
            password : process.env.ADMIN_PASS || 'admin'
        }
    }
};
