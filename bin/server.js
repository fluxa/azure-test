#!/usr/bin/env node
var app = require('../app');

var server = app.listen(app.get('port'), function() {
  console.info('NodeJS server running on %s', app.get('port'));
});
