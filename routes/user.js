var express = require('express');
var router = express.Router();
var user = require('../api/userInfo');
router.post('/login', user.login);
router.post('/register',user.create);
router.post('/update',user.update);
router.get('/userInfo/:id',user.getUserInfo);
router.post('/avatar/:id',user.updateAvatar);
// router.post('/logout', user.logout);

module.exports = router;