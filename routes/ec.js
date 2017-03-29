var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send(req.query);

  // 游戏ID
  var gameId = req.query.gameid || 0 ;
  // 平台
  var platform = req.query.platform || "未知平台" ;
  // 错误描述
  var error = req.query.error || "";
  // 时间
  var time = (new Date()).getTime();
  
  console.log(time);
  var list = [gameId,platform,error,time];

  res.send(list);

});

module.exports = router;