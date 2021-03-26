var UserModel = require('../models/userModel');
var util = require('../utils/util');
var mongoose = require('mongoose');

exports.create = async (req, res, next) => {
    let body = req.body;
    let r = await UserModel.find({
        username: body.username
    });
    if (r?.length > 0) {
        res.json(util.resJson({
            isSuccess: false,
            data: '用户名已存在'
        }));
        return
    }
    var ObjectId = mongoose.Types.ObjectId;
    var id1 = new ObjectId;
    let token = util.encrypt(id1 + '@' + new Date());
    var temp = new UserModel({
        username: body.username,
        password: body.password,
        id: id1,
        token: token
    });
    temp.save(function (err, r) {
        console.log(err);
        if (!err) {
            res.json(util.resJson({
                isSuccess: true,
                data: {
                    userName: body.username,
                    userId: id1,
                    token: token
                }
            }))
        } else {
            res.json(util.resJson({
                isSuccess: false,
                data: null
            }))
        }

    })
};

exports.login = async (req, res, next) => {
    let body = req.body;
    let r = await UserModel.find({
        username: body.username
    });
    if (r?.length === 0) {
        res.json({
            isSuccess: false,
            message: '用户不存在',
            data: null
        });
        return
    }
    if (r[0].password !== body.password) {
        res.json(util.resJson({
            isSuccess: false,
            message: '用户名或者密码错误',
            data: null
        }));
        return
    }
    if (r[0].password === body.password) {
        let token = util.encrypt(r[0].id + '@' + new Date());
        // console.log('token', token);
        UserModel.findOneAndUpdate({
            id: new mongoose.Types.ObjectId(r[0].id)
        }, {
            token: token
        }, err => {
            if (!err) {
                res.json(util.resJson({
                    isSuccess: true,
                    data: {
                        userName: r[0].username,
                        userId: r[0].id,
                        token: token
                    }
                }))
            } else {
                res.json(util.resJson({
                    isSuccess: false,
                    data: '更新token失败'
                }))
            }
        })
        return
    }

    var ObjectId = mongoose.Types.ObjectId;
    var id1 = new ObjectId;
    let token = util.encrypt(id1 + '@' + new Date());
    var temp = new UserModel({
        username: body.username,
        password: body.password,
        id: id1,
        token: token
    });
    temp.save(function (err, r) {
        console.log('&&&&&&&&&&&&err', err);
        if (!err) {
            res.json(util.resJson({
                isSuccess: true,
                data: {
                    userName: body.username,
                    userId: id1,
                    token: token
                }
            }))
        } else {
            res.json(util.resJson({
                isSuccess: false,
                data: null
            }))
        }

    })
};


exports.update = async (req, res, next) => {
    let body = req.body;
    let {userId} = req.body
    let r = await UserModel.findOneAndUpdate({
        id: userId
    }, {
        prefix: body.prefix,
        email: body.email,
        introduction: body.introduction,
        nickname: body.nickname,
        phone: body.phone,
        residence: body.residence,
        website: body.website
    }, function (err, r) {
        if (!err) {
            res.send({
                code: 1,
                isSuccess: true,
                message: '请求成功',
                data: null
            })
        } else {
            res.send({
                code: 0,
                isSuccess: false,
                message: err,
                data: null
            })
        }
    });
}

//获取用户信息
exports.getUserInfo = async (req, res, next) => {
    // let body = req.body;
    let {id} = req.params
    UserModel.findOne({
        id
    }, function (err, r) {
        if (!err) {
            res.json(util.resJson({
                isSuccess: true,
                message: '成功',
                data: r
            }))
        } else {
            res.json(util.resJson({
                isSuccess: false,
                message: '失败',
                data: null
            }))
        }
    });
};

exports.updateAvatar = async (req, res, next) =>{
    let body = req.body;
    let {id} = req.params;
    UserModel.findOneAndUpdate({
        id
    }, {
        avatar: body.avatar
    }, function (err, r) {
        if (!err) {
            res.json(util.resJson({
                isSuccess: true,
                message: '成功',
                // data: r
            }))
        } else {
            res.json(util.resJson({
                isSuccess: false,
                message: '失败',
                data: null
            }))
        }
    });
}