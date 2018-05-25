import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    content: String,
    tag: [String],
    isPublished: Boolean,
    commentCount: Number,
    createdTime: Date,
    modifiedTime: Date,
});

module.exports = mongoose.model('article', articleSchema);