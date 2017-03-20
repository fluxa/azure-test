'use strict';

// Dependencies
var config          = require('./config');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var compress        = require('compression');
var session         = require('express-session');
var MongoStore      = require('connect-mongo')(session);
var morgan          = require('morgan');
var cron            = require('./app/lib/cron');
var app             = express();



app.use(morgan('combined'));

// Configuration
app.enable('trust proxy');
app.set('port', process.env.PORT || config.env.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(function(req, res, next) {
    res.locals.config = config;
    next();
});

app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '128kb'}));
app.use(express.static('public'));
app.use(methodOverride());

app.locals.moment = require('moment-timezone');
app.locals.moment.locale('es');
app.locals.moment.tz.setDefault('America/Santiago');


console.log("using database "+config.env.database);
app.use(session({
    secret: config.common.session_secret,
    store: new MongoStore({
        url: config.env.database,
        collection: 'app_sessions',
        autoReconnect: true
    }),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2592000000
    }
}));

cron.schedule();

// Routes
require('./app/routes')(app);

module.exports = app;
