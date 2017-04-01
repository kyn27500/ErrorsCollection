var express = require('express');
var router = express.Router();

var EcDao= require("../dao/EcDao")
/* GET home page. */
var page = 1;
var count = 10;

router.get('/', function(req, res, next) {

	var pageid = req.query.page || page;
	var startIndex = 0+(pageid-1)*count
	var deleteid = req.query.deleteid

	// 检查是否删除
	if (deleteid){
		// 删除数据后，在查询本页数据
		EcDao.delete([deleteid],function(err,data){
			EcDao.queryByPage([startIndex,count],function(err,data){
				if (data){
					res.render('index',{page:pageid,message:encodeURI(JSON.stringify(data))});
				}
			});
		});


	}else{
		// 正常查询 数据
		EcDao.queryByPage([startIndex,count],function(err,data){
			if (data){
				res.render('index',{message:encodeURI(JSON.stringify(data))});
			}
		});

	}

});


module.exports = router;
