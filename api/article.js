var ArticleModel = require('../models/articleModel');
var util = require('../utils/util');
var mongoose = require('mongoose');

/*创建文章*/
exports.createNotes = async (req, res, next) => {
    let body = req.body;
    var id1 = new mongoose.Types.ObjectId;
    // let token = util.encrypt(id1 + '@' + new Date());
    var temp = new ArticleModel({
        categoryId: body.categoryId,
        title: body.title,
        articleId: id1
    });
    temp.save(function (err, r) {
        if (!err) {
            res.json(util.resJson({
                isSuccess: true,
                data: {
                    categoryId: body.categoryId,
                    title: body.title,
                    articleId: id1
                }
            }))
        } else {
            res.json(util.resJson({
                isSuccess: false,
                articleList: null
            }))
        }

    })
};

/*保存更新文章*/
exports.saveNotes = async (req, res, next) => {
    let body = req.body;
    console.log('@@@@@@@@@@@@@@@@',req.params);
    let {articleId} = req.params
    console.log(articleId);
    console.log('=========================================================');
    let r = await ArticleModel.update({
        articleId
    }, {
        title: body.title,
        content: body.content,
        htmlContent: body.htmlContent,
        articleId
    }, function (err, r) {
        console.log(r);
        if (!err) {
            res.json(util.resJson({
                isSuccess: true,
                message: '保存成功',
                data: {
                    content: body.content,
                    htmlContent: body.htmlContent
                }
            }))
        } else {
            res.json(util.resJson({
                isSuccess: false,
                message: '保存失败',
                data: null
            }))
        }
    });
};

/*获取更新文章*/
exports.getList = async (req, res, next) => {
    let body = req.body;
    let total = 0;
    let pageNum = parseInt(req.query.pageNum) || 1
    let pageSize = parseInt(req.query.pageSize) || 10
    let skip = (pageNum - 1) * pageSize
    console.log('=========================================================');
    ArticleModel.count({}, (err, count) => {
        if (err) next(err);
        total = count
        let query = ArticleModel.find({})
            .skip(skip)
            .limit(pageSize)
            .exec((err, data) => {
            console.log(data)
            let count = data.length
            let pageCount = Math.ceil(count / pageSize);

            if (err) {
                res.send({
                    code: 0,
                    message: '数据不存在'
                })
            } else {
                res.send({
                    code: 1,
                    message: '请求成功',
                    data: {
                        total: total,
                        pageNum: pageNum,
                        list: data
                    }
                })
            }
        })
    })
};


exports.getArticle = async (req, res, next) => {
    let body = req.body;
    let {articleId} = req.params
    let r = await ArticleModel.findOne({
        articleId
    }, function (err, r) {
        console.log(r);
        if (!err) {
            res.json(util.resJson({
                isSuccess: true,
                message: '保存成功',
                data: {
                    content: r.content,
                    htmlContent: r.htmlContent
                }
            }))
        } else {
            res.json(util.resJson({
                isSuccess: false,
                message: '保存失败',
                data: null
            }))
        }
    });
};