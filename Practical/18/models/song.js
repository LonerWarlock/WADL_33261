const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songName: String,
    film: String,
    musicDirector: String,
    singer: String,
    actor: String,
    actress: String
});

module.exports = mongoose.model('Song', songSchema);
