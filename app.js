var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
// var indexRouter = require('./routes/index');
// var monitorRouter = require('./routes/monitor');
// var upDataRouter = require('./routes/upData');
var userRouter = require('./routes/user');
var articleRouter = require('./routes/article');
var uploadRouter = require('./routes/upload');
// var ScheduleTask = require('./business/scheduleTask');

var util = require("./utils/util");
var mongoose = require('mongoose');
var fs = require('fs');
// mongoose.connect("mongodb://mongodb:27017/monitor2", {
mongoose.connect("mongodb://127.0.0.1:27017/workbench", {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: 30
});

//开启任务
// ScheduleTask.startTask();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//日志
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(logger('short', { stream: accessLogStream }));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
//cors
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.sendStatus(200); /*让options请求快速返回*/
    else next();
});
app.use('/User', userRouter);
app.use('/Article',  articleRouter);
app.use('/Upload',  uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.sendStatus(err.status || 500);
    // res.render('error');
});



module.exports = app;
