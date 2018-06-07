// import {get} from '../src/service'
var get = require('../src/service_req');

var axios = require('axios');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/warningInfoUpdate', function(req, res, next) {
	var projectCode = req.body.projectCode;
  console.log(req.body)
  // res.send('respond with a resource');
  if (!projectCode) {
	  res.status(500).json({ success: '参数无效' });
	}else {
		global.socket.emit(projectCode, { projectCode: projectCode, type: 'warning' });
	  res.status(200).json({success: true, msg: '收到，发了就好小伙子。', data: null}  );
	}
});

module.exports = router;
