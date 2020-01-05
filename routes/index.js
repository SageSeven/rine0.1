var express = require('express');
var router = express.Router();
var mysql = require('./../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  let query = "select * from msg";
  mysql.getDBConnection();
  mysql.connect.query(query, (err, rows, fields)=>{
  	res.send(rows);
  	mysql.connect.end();
  })
});

router.post('/login', function(req, res, next) {
	console.log("Post login received.")
	let msg = JSON.parse(Object.keys(req.body)[0]);
	let username = msg.username;
	let pwd = msg.password;
	console.log(msg);
	console.log("username:"+username, "pwd:"+pwd);
	res.json({name:username,pwd:pwd});
});

module.exports = router;
