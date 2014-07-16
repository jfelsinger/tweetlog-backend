var config = require('./config'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var LocalStrategy   = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .exec(function(err, user) {
                done(err, user);
            });
    });

    passport.use(new TwitterStrategy({
        consumerKey: config.auth.twitter.consumerKey,
        consumerSecret: config.auth.twitter.consumerSecret,
        callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                if (err) return done(err);

                if (user) {
                    return done(null, user);
                } else {

                    var newUser = new User();
                    var twitter = {};

                    console.log(profile);

                    twitter.id = profile.id;
                    twitter.token = token;
                    twitter.username = profile.username;
                    twitter.displayName = profile.displayName;
                    newUser.twitter = twitter;

                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }

            });
        });
    }));

};
