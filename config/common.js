'use strict';

module.exports = {
    timeZone : 'America/Santiago',
    timeFormat : 'YYYY-MM-DD HH:mm:ss',
    sessionSecret : 'asdaASasda3awe3A',
    admin : {
        login : {
            user : process.env.APPSETTING_ADMIN_USER || 'admin',
            password : process.env.APPSETTING_ADMIN_PASS || 'admin'
        }
    }
};
