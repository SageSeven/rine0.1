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
	console.log(Object.keys(req.body)[0]);
	let msg = JSON.parse(Object.keys(req.body)[0]);
	console.log(msg);
	let username = msg.username;
	let pwd = msg.pwd;
	console.log("username:"+username, "pwd:"+pwd);
	res.json({name:username,pwd:pwd});
});

router.post('/msg', function(req, res, next) {
	console.log(Object.keys(req.body)[0]);
	let msg = JSON.parse(Object.keys(req.body)[0]);
	let srcid = msg.srcid;
	let dstid = msg.dstid;
	let text = msg.text;
	let query = "insert into msg (srcid,dstid,text) values (" + 
		srcid + "," + dstid + "," + text + ")";
	mysql.getDBConnection();
	mysql.connect.query(query, (err, rows, fields)=>{
	  	res.send(rows);
	  	mysql.connect.end();
	})
});

router.get('/msg', function(req, res, next) {
	let query = "select * from msg";
	mysql.getDBConnection();
	mysql.connect.query(query, (err, rows, fields)=>{
		query = "select * from user where name='testUser01' and password='123123'";
		mysql.connect.query(query, (err, rows, fields)=>{
			console.log(rows);
			query = "select * from user where name='testUser01' and password='123124'";
			mysql.connect.query(query, (err, rows, fields)=>{
				console.log(rows);
				console.log(!!rows);
				mysql.connect.end();
			});
		});
		res.send(rows);
	})
	
	
})

router.post('/signup', function(req, res, next) {
	console.log(Object.keys(req.body)[0]);
	let msg = JSON.parse(Object.keys(req.body)[0]);
});

module.exports = router;
