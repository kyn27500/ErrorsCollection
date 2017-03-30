var express = require('express');
var router = express.Router();

var EcDao= require("../dao/EcDao")
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send(req.query);
  // 游戏ID
  var gameId = req.query.gameid || 0 ;
  // 平台
  var platform = req.query.platform || "unknown" ;
  // 错误描述
  var error = req.query.error || "Test data";
  // 时间
  var time = (new Date()).getTime();
  
  var list = [gameId,platform,error,time];

  // EcDao.add(list, res, next);
  EcDao.delete([8], res, next);

  console.log(list);
  // res.send(list);

});

module.exports = router;