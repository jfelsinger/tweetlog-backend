var async = require('async'),
    express = require('express');

module.exports = function(app) {
    var router = express.Router();
    var root = '../../app/api/';

    // Routes
    // ------------------------------------------------

    // Allow all domains
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    // Register routes
    app.use('/api', router);
};
