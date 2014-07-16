var express = require('express.io'),
    auth = require('./auth');
    config = require('./config');

module.exports = function(app, passport) {
    var staticFiles = config.staticFiles || 'client';

    // Authentication Routes
    // ------------------------------------------------
    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', 
        passport.authenticate('twitter', {
            successRedirect: '/client.html?yes',
            failureRedirect: '/client.html?no',
        }));

    app.use('/', auth.isLoggedIn(), function(req, res, next) {
        next();
    });

    // IO Routes
    // ------------------------------------------------
    app.io.on('connection', function(socket) {
        console.log('new connection');
    });

    app.io.route('test', function(req) {
        req.io.emit('test-response', {
            message: 'I am hungry'
        });
    });


    // Static Files
    // ------------------------------------------------
    app.use('/', express.static(__dirname + '/../'));
    app.use(express.static(__dirname + '/../'));

    // Allow all domains

    app.use('/api', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
};
