var express = require('express');
var router = express.Router();

var EcDao= require("../dao/EcDao")
/* GET home page. */
var page = 1;		// 当前页
var count = 10;		// 一页多少数据
var gameid = 0;		// 游戏ID

router.get('/', function(req, res, next) {

	var pageid = req.query.page || page;				//当前页ID
	var pagecount = 1;									//页数
	var startIndex = 0+(pageid-1)*count;				//当前页的开始ID
	var deleteid = req.query.deleteid;					//删除数据ID
	var gameid = parseInt(req.query.gameid) || gameid;	//游戏ID

	// 检查是否删除
	if (deleteid){
		// 删除数据后，在查询本页数据
		EcDao.delete([deleteid],function(err,data){
			EcDao.queryByPage([startIndex,count],function(err,data){
				if (data){
					res.render('index',{gameid:gameid,page:pageid,pagecount:pagecount,message:encodeURI(JSON.stringify(data))});
				}
			});
		});


	}else{

		if (gameid > 0){
			// 查询数据数量
			EcDao.getDataCountByGid([gameid],function(err,data){
				pagecount = Math.ceil(data[0].pagecount/count);
			})

			// 正常查询 数据
			EcDao.queryByPageAndGid([gameid,startIndex,count],function(err,data){
				if (data){
					res.render('index',{gameid:gameid,page:pageid,pagecount:pagecount,message:encodeURI(JSON.stringify(data))});
				}
			});
		}else{
			// 查询数据数量
			EcDao.getDataCount([],function(err,data){
				pagecount = Math.ceil(data[0].pagecount/count);
			})

			// 正常查询 数据
			EcDao.queryByPage([startIndex,count],function(err,data){
				if (data){
					res.render('index',{gameid:gameid,page:pageid,pagecount:pagecount,message:encodeURI(JSON.stringify(data))});
				}
			});
		}
		
	}

});




module.exports = router;
