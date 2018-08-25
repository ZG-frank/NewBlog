const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    pathName: { type: String, default: '' },
    abstract: String,
    content: String,
    
    tags: [String],
    status: { type: Number, default: 0 }, // 0-草稿，1-已发布，2-发布撤回
    isPublished: Boolean,
    viewNum: Number,
    commentNum: Number,
    allowComment: { type: Boolean, default: true },
    createdTime: Date,
    modifiedTime: Date,
    createdAt: { type: String, default: '' },
    updatedAt: { type: String, default: '' },

    type: { type: String, default: '' },
    status: { type: Number, default: 0 },
    title: String,
    pathName: { type: String, default: '' },
    summary: { type: String },
    markdownContent: { type: String },
    content: { type: String },
    markdownToc: { type: String, default: '' },
    toc: { type: String, default: '' },
    allowComment: { type: Boolean, default: true },
    createdAt: { type: String, default: '' },
    updatedAt: { type: String, default: '' },
    isPublic: { type: Boolean, default: true },
    options: Object,
    category: String,
    tags: Array
});

module.exports = mongoose.model('article', articleSchema);