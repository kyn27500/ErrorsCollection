var express = require('express');
var router = express.Router();

var EcDao= require("../dao/EcDao")
/* GET home page. */
var page = 1;

router.get('/', function(req, res, next) {

	var pageid = req.query.page || page;
	console.log(pageid);


	EcDao.queryByPage([1,10],function(err,data){
			
		if (data){
			// res.send(data);
			// console.log(data[1]);
			// console.log(JSON.stringify(data));
			res.render('index',{message:data});


		}
	});

});




module.exports = router;
