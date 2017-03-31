var express = require('express');
var router = express.Router();

var EcDao= require("../dao/EcDao")
/* GET home page. */
router.get('/', function(req, res, next) {

  EcDao.queryByPage([1,10],function(err,data){

  	if (data){
  		res.render('index',{message:data});
  		// res.send(data);
 	}
  });

});
 

module.exports = router;
