// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./SqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 建立连接，向表中插入值
			// 'insert into t_ec(id, gameid, platform, error, time) VALUES(0,?,?,?,?)
			connection.query($sql.insert, req, function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},

	delete: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 建立连接，删除数据
			connection.query($sql.delete, req, function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'删除成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},


	queryByPage: function (req,callback) {
		pool.getConnection(function(err, connection) {
			// 建立连接，删除数据
			connection.query($sql.queryByPage,req,function(err,result) {
				callback(err,result)
				// 释放连接 
				connection.release();
			});
		});
	}

};