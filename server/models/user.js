const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    nickname: { type: String, default: '' },
    password: String,
    email: String,
    avatar: { type: String, default: '' },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('user', userSchema);