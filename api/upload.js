var util = require('../utils/util');
var mongoose = require('mongoose');

/*上传*/
exports.upload = async (req, res, next) => {
    console.log(req.file);
    let imgPath = req.file.path.split('public')[1]
    let imgUrl = 'http://127.0.0.1:8989' + imgPath
    res.send({
        code: 1,
        message: '请求成功',
        data: {
            url: imgUrl
        }
    })
    // res.send({code:0,msg:'上传成功',data:imgUrl})
    console.log(imgPath);
};
