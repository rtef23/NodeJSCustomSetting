const file = '/utils/db.js';

module.exports = function(config){
	var util = require('util');
	var Promise = require('bluebird');
	var dbInfo = require(config['path']['project'] + '/private/infos/db_info.json');
	var mysql = require('mysql');

	if(!config){
		throw new Error('config is not proveded');
	}
	function executeQuery(q, data){
		return new Promise(function(resolve, reject){
			var conn = mysql.createConnection(dbInfo);

			conn.connect(function(err){
				if(err){
					//return reject(util.format('at %s, connection fail\n%s', file, err));
					return reject(Error(util.format('at %s, connection fail\n%s', file, err)));
				}
			});

			if(!conn){
				return reject(Error(util.format('at %s, malformed connection\n%s', file, err)));
			}

			conn.query(q, data, function(err, rows){
				conn.end();
				if(err){
					return reject(Error(util.format('at %s, query error\n%s', file, err)));
				}
				return resolve(rows);
			});
		});
	};

	return {
		executeQuery : executeQuery
	};
};
