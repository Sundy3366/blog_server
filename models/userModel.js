var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    username: {type: String, unique: true},
    password: String,
    phone: String,
    isActive: {type: Boolean, default: false},
    createTime: {type: Date, default: Date.now},
    id: Schema.Types.ObjectId,
    token: String
});

module.exports = mongoose.model('UserDataInfo', schema);