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
  	//mysql.connect.end();
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

router.post('/sendMsg', function(req, res, next) {
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
	  	//mysql.connect.end();
	})
});

router.post('/getMsg', (req, res, next)=>{
	let msg = JSON.parse(Object.keys(req.body)[0]);
	let dstId = msg.dstId;
	let query = "select * from msg where dstid="+dstId;
	mysql.getDBConnection();
	mysql.connect.query(query, (err, rows, fields)=> {
		res.send(rows);
		query = "delete from msg where dstid="+dstId;
		mysql.connect.query(query);
	});
});

router.get('/msg', function(req, res, next) {
	let query = "select * from msg";
	mysql.getDBConnection();
	mysql.connect.query(query, (err, rows, fields)=>{
		res.send(rows);
	});
});

router.post('/signUp', function(req, res, next) {
	console.log(Object.keys(req.body)[0]);
	let msg = JSON.parse(Object.keys(req.body)[0]);
	let name = msg.name;
	let password = msg.password;
	let nKey = msg.keyN;
	let eKey = msg.keyE;
	console.log("1");
	let query = "insert into user (name,password,key_n,key_e) values (\""+
		name + "\",\"" + password + "\",\"" + nKey + "\",\"" + eKey + "\")";
	console.log(query);
	mysql.connect.query(query, (err, rows, fields)=> {
		res.send(rows);
	})
});

module.exports = router;
