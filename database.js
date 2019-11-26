const mysql = require('mysql');
const config = require('./config');

function getDBConnection() {
	let database = mysql.createConnection(config.DB);
	database.connect(err=>{
		if (err) {
			setTimeout(getDBConnection, 2000);
		}
	});
	database.on('error', ()=>{
		logger.error('db error', err);
	    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
	        logger.error('db error执行重连:'+err.message);
	        getDBConnection();
	    } else {
	        throw err;
	    }
	});
	exports.connect = database;
}
exports.getDBConnection = getDBConnection;