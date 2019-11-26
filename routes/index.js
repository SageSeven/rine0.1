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

module.exports = router;
