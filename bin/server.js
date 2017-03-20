#!/usr/bin/env node
var app = require('../app');

var port = app.get('port');
console.log('port => %s', port);
var server = app.listen(port, function() {
  console.info('NodeJS server running on %s', port);
});
