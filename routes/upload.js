var express = require('express');
var router = express.Router();
var uploader = require('../api/upload');
var multer  = require('multer')
var path = require('path');
var fs = require('fs');
let upload = multer({
    storage: multer.diskStorage({
        // 设置文件存储位置
        destination: function(req, file, cb) {
            let date = new Date()
            let year = date.getFullYear()
            let month = (date.getMonth() + 1).toString().padStart(2, '0')
            let day = date.getDate()
            //__dirname 总是指向被执行 js 文件的绝对路径
            let dir = path.join(__dirname, '../public/uploads/' + year + month + day)

            // 判断目录是否存在，没有则创建
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                })
            }

            // dir就是上传文件存放的目录
            cb(null, dir)
        },
        // 设置文件名称
        filename: function(req, file, cb) {
            let fileName = Date.now() + path.extname(file.originalname)
            // fileName就是上传文件的文件名
            cb(null, fileName)
        }
    })
})

router.post('/upload',upload.single('avatar'), uploader.upload);
// router.post('/logout', user.logout);

module.exports = router;