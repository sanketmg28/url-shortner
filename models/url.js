const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        require: true,
    },
    visitHistory: [{
        timestamp: {type: Number}
    }]
}, {timestamp: true});

const URL = mongoose.model('url', urlSchema);
module.exports = URL;
