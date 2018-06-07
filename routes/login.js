// import {get} from '../src/service'
var axios = require('axios');

var express = require('express');
var router = express.Router();

/* GET users listing. */

router.post('/singleLogin', function(req, res, next) {
  var staffCode = req.body.staffCode //人员
  var loginTime = req.body.loginTime //登陆时间

	var LoginInfo = {
		staffCode,
		loginTime
	}
	if (!staffCode || !loginTime) {
		res.status(500).json({ success: '参数无效' });
	} else {
    io.sockets.emit('reLogin', LoginInfo)
		res.status(200).json({success: true, data: LoginInfo})
	}
});

module.exports = router;
