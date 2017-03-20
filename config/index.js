'use strict';

var environment   = process.env.NODE_ENV;
var config        = {};

config.common     = require('./common');

console.info('Starting in %s mode', environment);

switch (environment) {
    case 'prod':
    case 'production':
        config.env = require('./prod');
        break;
    case 'dev':
    case 'development':
        config.env = require('./dev');
        break;
    case 'local':
    default:
        config.env = require('./local');
        break;
}

module.exports    = config;
