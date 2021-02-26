var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    // 关联字段
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: String,
    // 用户
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    article: String,
    content: {type: String, default: ''},
    htmlContent: {type: String, default: ''},
    view:{
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    createTime: {type: Date, default: Date.now},
    articleId: Schema.Types.ObjectId,
    token: String,
    comments: {
        type: Array,
        default: []
    },
    articleList: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model('articleModel', schema);