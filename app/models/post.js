var mongoose = require('mongoose'), 
    _ = require('underscore'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, default: '', trim: true },
    segments: [{
        text: { type: String, trim: true },
        tweetId: { type: String, trim: true },
    }],
    user: { type: Schema.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    lastEditedAt: { type: Date, default: Date.now }
});
