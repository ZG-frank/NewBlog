const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    nickname: String,
    password: String,
    email: String,
    avatar: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('user', userSchema);