var express = require('express');
var router = express.Router();
var article = require('../api/article');
// router.post('/article/list', article.list); //获取列表
router.post(`/notes/create`,article.createNotes); //新建文章返回文章ID
router.post(`/notes/getList`,article.getList); //获取文章列表
router.post(`/notes/preview/:articleId`,article.getArticle); //获取文章
router.post(`/notes/save/:articleId`,article.saveNotes); //保存文章
// https://www.jianshu.com/author/notes/84282699/content
// router.post('/logout', user.logout);

module.exports = router;