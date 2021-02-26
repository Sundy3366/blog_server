var express = require('express');
var router = express.Router();
var user = require('../api/userInfo');
router.post('/login', user.login);
router.post('/register',user.create);
// router.post('/logout', user.logout);

module.exports = router;