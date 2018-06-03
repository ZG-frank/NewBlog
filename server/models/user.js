const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    nickname: String,
    password: String,
    avatar: String,
    createdTime: Date,
    modifiedTime: Date,
});

module.exports = mongoose.model('user', userSchema);