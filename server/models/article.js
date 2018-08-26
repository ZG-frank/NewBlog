const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    abstract: String,
    pathName: String,
    tags: [String],
    status: { type: Number, default: 0 }, // 0-草稿，1-已发布，2-发布撤回
    isPublic: { type: Boolean, default: true },
    viewNum: { type: Number, default: 0 },
    commentNum: { type: Number, default: 0 },
    allowComment: { type: Boolean, default: true },
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('article', articleSchema);