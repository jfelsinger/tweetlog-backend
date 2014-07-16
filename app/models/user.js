var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    twitter: {},
    createdAt : { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema);
