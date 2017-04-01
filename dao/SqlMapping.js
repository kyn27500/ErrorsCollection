// dao/sqlMapping.js
// CRUD SQL语句
var user = {
	insert:'insert into t_ec(id, gameid, platform, error, time) VALUES(0,?,?,?,?)',
	// update:'update t_ec set name=?, age=? where id=?',
	delete: 'delete from t_ec where id=?',
	queryByType: 'select * from t_ec where gameid=?',
	queryByPage: 'select * from t_ec order by id desc limit ?,?'
};

module.exports = user;